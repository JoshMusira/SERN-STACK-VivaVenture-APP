import React, { useState } from 'react';
import './needhelp.css';
import PlaceOrder from '../../components/placeorder/PlaceOrder';
import TrackOrder from '../../components/trackOrder/TrackOrder';
import Timelines from '../../components/timelines/Timelines';
import Questions from '../../components/askedQuestions/Questions';

const NeedHelp = () => {
    const [placeOrder, setPlaceOrder] = useState(true);
    const [trackOrder, setTrackOrder] = useState(false);
    const [timeline, setTimeline] = useState(false);
    const [questions, setQuestions] = useState(false);

    return (
        <div className='needhelp'>
            <div className="top-needhelp">
                <h1>HOW TO PLACE <br /> & TRACK ORDER</h1>
            </div>
            <div className="bottom-needhelp">
                <div className="topNavbar">
                    <h3 onClick={() => {
                        setPlaceOrder(true);
                        setTrackOrder(false);
                        setTimeline(false);
                        setQuestions(false);
                    }}>PLACE ORDER</h3>
                    <h3 onClick={() => {
                        setPlaceOrder(false);
                        setTrackOrder(true);
                        setTimeline(false);
                        setQuestions(false);
                    }}>TRACK ORDER</h3>
                    <h3 onClick={() => {
                        setPlaceOrder(false);
                        setTrackOrder(false);
                        setTimeline(true);
                        setQuestions(false);
                    }}>TIMELINES</h3>
                    <h3 onClick={() => {
                        setPlaceOrder(false);
                        setTrackOrder(false);
                        setTimeline(false);
                        setQuestions(true);
                    }}>FREQUENTLY ASKED QUESTIONS</h3>
                </div>
                {placeOrder && <PlaceOrder />}
                {trackOrder && <TrackOrder />}
                {timeline && <Timelines />}
                {questions && <Questions />}
            </div>
        </div>
    );
};

export default NeedHelp;
