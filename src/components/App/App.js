import React, { Component } from "react"  ;
import "./App.css";
import image1 from '../Assets/Images/swamp.png'
import image2 from '../Assets/Images/mountain.png'
import image3 from '../Assets/Images/island.png'
import image4 from '../Assets/Images/forest.png'
import image5 from '../Assets/Images/plain.png'
import image6 from '../Assets/Images/lotus.png'
import image7 from '../Assets/Images/sorin.png'
import image8 from '../Assets/Images/nicol.png'
var _ = require('lodash');

const uniqueCards = ['swamp','island','plain','forest','mountain','lotus','sorin','nicol'];
const numCardsToMatch = 2;
class App extends Component {
	constructor(){
		super();
		this.state = {
			cards: [],
			card1: 1000,
			card2: 1000,
			cardsLeft: 16,
			moves: 0
		};
		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
		this.shuffleCards();
	}

	multiplyCards(cards,multiplier){
    let loopTimes = multiplier - 1;
    let multiplied = cards;
    for (var i = 0; i < loopTimes; i++){
      multiplied = _.concat(multiplied,cards);
    }
    return multiplied;
  }

  shuffleCards(){
    let multipliedCards = this.multiplyCards(uniqueCards,numCardsToMatch);
    let shuffled = _.shuffle(multipliedCards);
    //make each card an object with its own state values:
    let cards = shuffled.map(function(val){
      return {
        type: val,
        position: 'unselected'
      }
    });
		this.state.cards = cards;
  }

	handleClick(index){
		//chequea si la carta esta deseleccionada
		// console.log(this.state.cards[index].position)
		if(this.state.cards[index].position == "unselected"){
			this.state.cards[index].position = "selected"; //cambio de estado
			//si no ha sido seleccionada ninguna carta
			if(this.state.card1==1000){
				this.setState({
					card1: index
				})
				this.state.card1 = index;
				console.log("Tipo de la carta 1: ", this.state.cards[this.state.card1].type);
			}else{
				this.setState({
					card2 : index
				})
				this.state.card2 = index;
				console.log("Tipo de la carta 2: ", this.state.cards[this.state.card2].type);
				if(this.state.cards[this.state.card1].type == this.state.cards[this.state.card2].type){
					var cardsL = this.state.cardsLeft;
					var mov = this.state.moves;
					this.setState({
						cardsLeft: cardsL - 2,
						card1 : 1000,
						card2 : 1000,
						moves : mov + 1
					})
					this.state.cardsLeft = this.state.cardsLeft-2;

					var scope = this;
					if(this.state.cardsLeft == 0){
						setTimeout(function(){ alert("You won! You did it in " + scope.state.moves + " moves"); }, 1000);
					}
				}else{
					var scope = this;
					var mov  = this.state.moves;
					this.setState({
						moves: mov + 1
					})
					setTimeout(function(){
						scope.state.cards[scope.state.card1].position = "unselected";
						scope.state.cards[scope.state.card2].position = "unselected";
						scope.state.card1 = 1000;
						scope.state.card2 = 1000;
						scope.setState({
							card1: 1000,
							card2: 1000
						})
					}, 666);
				}
			}
		}
	}

	render()  {
		var img = null;
		return (
			<div>
				<h1>Memory Game</h1>
				<div class="cards">
					{
						this.state.cards.map((cont, index)=>{
							if(this.state.cards[index].type == "swamp"){
								img = image1;
							}else if(this.state.cards[index].type == "mountain"){
								img = image2;
							}else if(this.state.cards[index].type == "island"){
								img = image3;
							}else if(this.state.cards[index].type == "forest"){
								img = image4;
							}else if(this.state.cards[index].type == "plain"){
								img = image5;
							}else if(this.state.cards[index].type == "lotus"){
								img = image6;
							}else if(this.state.cards[index].type == "sorin"){
								img = image7;
							}else if(this.state.cards[index].type == "nicol"){
								img = image8;
							}
							if(this.state.cards[index].position == "unselected"){
								//do something
								return(
									<div class="card" onClick = {this.handleClick.bind(this, index)} key={index}>
										<div class="content">
											<div class="front"></div>
											<div class="back" style = {{backgroundImage: 'url(' + img + ')'}}></div>
										</div>
									</div>
								)
							}else{
								//do something else
								return(
									<div class="card" onClick = {this.handleClick.bind(this, index)} key={index}>
										<div class="content animate">
											<div class="front"></div>
											<div class="back" style = {{backgroundImage: 'url(' + img + ')'}}></div>
										</div>
									</div>
								)
							}
						})
					}
				</div>
			</div>
		);
	}
}

export default App;
