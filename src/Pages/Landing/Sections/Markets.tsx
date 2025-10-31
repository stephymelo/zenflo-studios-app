import React, { useState } from "react";
import ecommerce from '../../../Assets/Projects/ecommerce-sector.jpg';
import fintech from '../../../Assets/Projects/fintech-sector.jpg';
import beauty from '../../../Assets/Projects/beauty-sector.jpg';

interface Market {
  id: string;
  name: string;
  image: string;
}

const Markets = () => {
  const markets: Market[] = [
    { id: "fintech", name: "FinTech", image: fintech },
    { id: "ecommerce", name: "eCommerce", image: ecommerce },
    { id: "beauty", name: "Beauty", image: beauty },
  ];

  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  const currentImage = markets.find((m) => m.id === hoveredMarket)?.image;

  return (
    <section className="markets">
      <div className="markets-title">
        <h4 className="markets-title__title">Industries</h4>
        <p className="markets-title__description">
         We’ve worked across many industries, but these are where we bring the most impact.
        </p>
      </div>

      <div className="markets-container">
        <div className="markets-section-1">
          <div className="markets-image-container">
            {hoveredMarket && (
              <img
                src={currentImage}
                alt={hoveredMarket}
                className="markets-image"
              />
            )}
          </div>
        </div>

        <div className="markets-section-2">
          <ul
            className="markets-list"
            onMouseLeave={() => setHoveredMarket(null)}
          >
            {markets.map((market) => (
              <li
                key={market.id}
                className={`markets-item ${hoveredMarket === market.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredMarket(market.id)}
              >
                {market.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Markets;
