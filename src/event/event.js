import React, {Component} from "react";
import './event.less'
export class EventExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.clickPic = this.clickPic.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', (e) => {
            // if(e.target
            //     && e.target.matches('div.pic')) {
            //     return;
            // }
            console.log('bo')
            this.setState( {
                active: false
            });
        }, false);
    }


    handleClick(e) {
        console.log(e,this.state.active)
        this.setState({
            active: !this.state.active
        });
        // e.stopPropagation()
    }

    clickPic(e) {
        this.setState({
            active: false
        })
        // e.stopPropagation();/**/
    }

    render() {
        return (
            <div onClick={() => {
                console.log('wrapper')
            }}>
                <button onClick={this.handleClick}>展开图片</button>
                <div  style={
                    {'display':this.state.active?'block':'none'}
                } className='pic' onClick={this.clickPic} >
                </div>
            </div>
        );
    }

}
