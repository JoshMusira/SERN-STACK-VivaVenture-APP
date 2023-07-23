import React, { useContext } from 'react'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Topbar from '../../components/topbar/Topbar'
import "./dashboard.css"
import WidgetSm from '../../components/dashboardwidget/WidgetSm'
const Dashboard = () => {

    return (
        <div className='main_wrapper_container'>
            <Topbar />
            <FeaturedInfo />
            <div className="widgeDashboard">
                <WidgetSm />
                <WidgetSm />
            </div>
        </div>
    )
}

export default Dashboard