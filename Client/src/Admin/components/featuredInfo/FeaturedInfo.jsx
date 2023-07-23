import "./featuredInfo.css";
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$45,435</span>
          <span className="featuredMoneyRate">
            -88.4 <AiOutlineArrowDown className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$9,415</span>
          <span className="featuredMoneyRate">
            -5.4 <AiOutlineArrowDown className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

    </div>
  );
}
