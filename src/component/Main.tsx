import React from 'react';
import '../style/Main.css';

import PostNote, {PNote} from './PostNote';
import WriteNote from './WriteNote';
const Endpoint = "https://rollingpaper.heavyrisem.xyz";

interface SMain {
	PostNotelist: Array<PNote>
}

class Main extends React.Component<any, SMain> {
	constructor(props: any) {
		super(props);
		this.state = {
			PostNotelist: []
		}
		this.GetNotes();
	}

	async GetNotes() {
		let NotesResponse = await fetch(`${Endpoint}/GetNotes`, {
			method: "GET",
			headers: {'Content-Type': 'application/json'}
		});
		console.log(NotesResponse)
		if (NotesResponse.ok) {
			const Notes: Array<PNote> = await NotesResponse.json();
			console.log(Notes)
			this.setState({
				PostNotelist: Notes
			})
		} else {
			alert("서버 연결중 오류 발생");
			console.log(NotesResponse.ok)
		}
	}

	async Submit(author: string, description: string) {
		if (author && description) {
			const ServerResult = await fetch(`${Endpoint}/UploadNote`, {
				method: "PUT",
				body: JSON.stringify({
					author: author,
					description: description
				}),
				headers: {'Content-Type': 'application/json'}
			});
			const Result = await ServerResult.json();
			if (Result.status) {this.GetNotes()}
			else {alert("데이터 전송 중 오류 발생")};
		}
	}

	
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

	render() {
		return (
			// <img src="https://g-grafolio.pstatic.net/20201122_59/1605973298374Sc0Lj_JPEG/20201121_233611.jpg" alt="" />
			<div className="Main">
					<WriteNote Submit={this.Submit.bind(this)}/>
					{this.state.PostNotelist&&
						this.state.PostNotelist.map((Note, idx) => (
							<PostNote key={idx} description={Note.description} author={Note.author} />
						))
					}
			</div>
		)
	}
}

export default Main;
