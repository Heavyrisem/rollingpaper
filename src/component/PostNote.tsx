import React from 'react';
import '../style/PostNote.css';

export interface PNote {
    description: string,
    author: string,
    color?: string
}

class PostNote extends React.Component<PNote> {
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    

    render() {
        const colors = ['9a95cd', 'af98cd', 'c3d38e', 'cce3d3', 'ecb497', 'f4b7b4'];
        const rotate = this.getRandomInt(1, 2) * ((this.getRandomInt(0, 2))? -1:1);
        const color = colors[this.getRandomInt(0, colors.length)];
        return (
            <div className={"PostNote"} style={{transform: `rotate(${rotate}deg)`, backgroundColor: `#${color}`}}>
                <p>{this.props.description}</p>
                <span>{this.props.author}</span>
            </div>
        )
    }

}

export default PostNote;