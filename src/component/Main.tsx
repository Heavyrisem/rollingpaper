import React from "react";
import "../style/Main.css";
import Footer from "./Footer";

import PostNote, { PNote } from "./PostNote";
import WriteNote from "./WriteNote";

interface SMain {
  PostNotelist: Array<PNote>;
}

class Main extends React.Component<any, SMain> {
  constructor(props: any) {
    super(props);
    this.state = {
      PostNotelist: [],
    };
  }

  componentDidMount() {
    this.GetNotes();

    // Dark Mode
    this.SwitchDarkMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.SwitchDarkMode(
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      });
  }

  SwitchDarkMode(isDark: boolean) {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  async GetNotes() {
    let NotesResponse = await fetch(`/GetNotes`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(NotesResponse);
    if (NotesResponse.ok) {
      const Notes: Array<PNote> = await NotesResponse.json();
      // console.log(Notes)
      this.setState({
        PostNotelist: Notes,
      });
    } else {
      alert("서버 연결중 오류 발생");
      // console.log(NotesResponse.ok)
    }
  }

  async Submit(author: string, description: string) {
    if (author && description) {
      const ServerResult = await fetch(`/UploadNote`, {
        method: "PUT",
        body: JSON.stringify({
          author: author,
          description: description,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const Result = await ServerResult.json();
      if (Result.status) {
        this.GetNotes();
      } else {
        alert("데이터 전송 중 오류 발생");
      }
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  render() {
    return (
      <>
        <div className="Main">
          {this.state.PostNotelist &&
            this.state.PostNotelist.map((Note, idx) => (
              <PostNote
                key={idx}
                description={Note.description}
                author={Note.author}
              />
            ))}
          {/* <WriteNote Submit={this.Submit.bind(this)}/> */}
        </div>
        <Footer />
      </>
    );
  }
}

export default Main;
