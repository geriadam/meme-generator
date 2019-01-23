import React, { Component } from 'react';

class MemeGenerator extends Component {
	constructor()
	{
		super();
		this.state = {
			topText: "",
			bottomText: "",
			randomImg: "https://t7.rbxcdn.com/a1d70180e9d08788a8dc125b3cbba969",
			allMemeImgs: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleGenerate = this.handleGenerate.bind(this);
	}

	componentDidMount(){
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => {
				const { memes } = response.data;
				this.setState({
					allMemeImgs: memes
				})
			})
	}

	handleChange(event){
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	handleGenerate(event){
		event.preventDefault()
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
		const randMemeImg = this.state.allMemeImgs[randNum].url
		this.setState({
			randomImg: randMemeImg
		})
	}

	render(){
		return(
			<div>
				<form className="meme-form">
					<input 
						type="text"
						name="topText"
						placeholder="Top text"
						value={this.state.topText}
						onChange={this.handleChange}
					/>
					<input 
						type="text"
						name="bottomText"
						placeholder="Bottom text"
						value={this.state.bottomText}
						onChange={this.handleChange}
					/>
					<button onClick={this.handleGenerate}>Generate</button>
				</form>
				<div className="meme">
					<img src={this.state.randomImg} alt="" />
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText}</h2>
				</div>
			</div>
		)
	}
}

export default MemeGenerator;