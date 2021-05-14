import React from 'react';
import '../style/WriteNote.css';

interface PWriteNote {
    Submit: Function
}

class WriteNote extends React.Component<PWriteNote> {
    Description: HTMLParagraphElement | null = null;
    Author: HTMLSpanElement | null = null;

    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    Submit() {
        if (this.Description || this.Author) {
            if (this.Description?.textContent && this.Author?.textContent) {
                this.props.Submit(this.Author.textContent, this.Description.textContent)
            }
        }
    }
    
    render() {
        const colors = ['9a95cd', 'af98cd', 'c3d38e', 'cce3d3', 'ecb497', 'f4b7b4'];
        const rotate = this.getRandomInt(1, 3) * ((this.getRandomInt(0, 2))? -1:1);
        const color = colors[this.getRandomInt(0, colors.length)];
        return (
            <div className={"WriteNote PostNote" + (` H${color}`)} style={{transform: `rotate(${rotate}deg)`}}>
                <p contentEditable suppressContentEditableWarning={true} ref={(e)=>this.Description=e} placeholder="편지를 작성해 주세요"></p>
                <span contentEditable suppressContentEditableWarning={true} ref={(e)=>this.Author=e} placeholder="이름"></span>
                <button onClick={this.Submit.bind(this)}>전송</button>
            </div>
        )
    }

}

export default WriteNote;