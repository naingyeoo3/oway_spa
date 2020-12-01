import React, { Component } from 'react';
import IntegreatedIcon from './Icon';
import update from 'react-addons-update';

class TopScrollButton extends Component {
    constructor(props){
        super(props);
        this.state={
            scrollStepInPx: 50, 
            delayInMs: 16.66,
            intervalId: 0,
            isScrollToTop: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        const { isScrollToTop } = this.state;        
        if(isScrollToTop == false){
            if(window.scrollY > 105){
                this.setState(update(this.state, {$set:{ isScrollToTop : true}}))
            }
        }else{
            if(window.scrollY < 105){
                this.setState(update(this.state, {$set:{ isScrollToTop : false}}))
            }
        }
    }
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.state.scrollStepInPx);
    }      
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.state.delayInMs);
        this.setState({ intervalId: intervalId });
    }
    render() {         
        const { isScrollToTop } = this.state;
        return (
            <div>
                {
                isScrollToTop &&
                <div className="app-container to-page">
                    <button onClick={()=> this.scrollToTop()}>
                        <IntegreatedIcon type="up-circle"/>
                    </button>
                </div>
                }
            </div>
        );
    }
}

export default TopScrollButton;