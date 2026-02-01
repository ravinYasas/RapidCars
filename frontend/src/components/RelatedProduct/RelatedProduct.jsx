import { StoreContext } from '../../context/StoreContext'
import Item from '../Item/Item'
import './RelatedProduct.css'

import React, { useContext, useEffect, useState } from 'react'

const RelatedProduct = ({category, subCategory, make, model, grade, id, price}) => {

    const {products} = useContext(StoreContext)
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (!products.length) return;

        const normalize = str => str ? String(str).trim().toLowerCase() : '';

        // exclude current product
        const pool = products.filter(p => p._id !== id);

        // Build scored candidates so we can sort by relevance
        const candidates = [];
        const nMake = normalize(make);
        const nModel = normalize(model);
        const nGrade = normalize(grade);
        const numericPrice = Number(price) || 0;
        const priceDelta = numericPrice > 0 ? numericPrice * 0.15 : 0;

        pool.forEach(p => {
            const pMake = normalize(p.make);
            const pModel = normalize(p.model);
            const pGrade = normalize(p.grade);
            const pFuel = normalize(p.fuel);
            const pPrice = Number(p.startingPrice || p.price || 0) || 0;

            let score = 0;

            // Prioritize same make+model other grades
            if (nMake && nModel && pMake === nMake && pModel === nModel) {
                if (pGrade && nGrade && pGrade !== nGrade) {
                    score += 200; // other grade
                } else if (pFuel && pFuel.includes('hybrid')) {
                    score += 180; // hybrid variant
                } else if (pGrade && nGrade && pGrade === nGrade) {
                    score += 120; // same grade
                } else {
                    score += 100; // same model, no grade info
                }
            }

            // Price proximity score (up to 80)
            if (numericPrice > 0 && pPrice > 0 && priceDelta > 0) {
                const diff = Math.abs(pPrice - numericPrice);
                if (diff <= priceDelta) {
                    const proximityScore = Math.round((1 - diff / priceDelta) * 80);
                    score += proximityScore;
                }
            }

            // Small bonus for same category/subCategory
            if (category && subCategory && p.category === category && p.subCategory === subCategory) {
                score += 20;
            }

            if (score > 0) {
                candidates.push({ product: p, score, pPrice });
            }
        });

        // Sort: score desc, then price proximity asc
        candidates.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            const aDiff = Math.abs((a.pPrice || 0) - numericPrice);
            const bDiff = Math.abs((b.pPrice || 0) - numericPrice);
            return aDiff - bDiff;
        });

        const finalList = candidates.map(c => c.product).slice(0, 5);
        setRelated(finalList);

    }, [products, category, subCategory, make, model, id, price]);
    
    

  return (
    <div className='related-products'>
            <div className="topic">
                <p>Related <span>Vehicles</span></p>
                <p className="related-bar"></p>
            </div>
            <div className="product-details-item">
                {related.map((item,i)=>(
                    <Item key={i} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
    </div>
  )
}

export default RelatedProduct