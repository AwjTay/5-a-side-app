import React, { Component } from "react";
import TeamField1 from "../TeamField/TeamField1";
import TeamField2 from "../TeamField/TeamField2";
import Thermometer1 from "../Thermometer/Thermometer1";
import Thermometer2 from "../Thermometer/Thermometer2";

class DraftScreen extends Component {
	constructor(props){
		super(props);

		this.state = {
			playerName : "",
			playerExperience : 10,
			errorMessage : "",
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSliderChange = this.handleSliderChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

	}

	handleInputChange(e){
		this.setState({ playerName : e.currentTarget.value})
	}

	handleSliderChange(e){
		this.setState({ playerExperience : e.currentTarget.value})
		console.log(this.state.playerExperience);
	}

	handleClick(e){
		e.preventDefault();
		if(!this.state.playerName){
			this.setState({ errorMessage : "Please enter a player name" })
		} else {
			let { team1Players, team2Players } = this.props;
			
			team1Players.length === 0 && team2Players.length === 0 ? this.props.onFirstSubmit(this.state) : this.props.onSubmit(this.state);
			this.setState({ playerName : "" })
			this.setState({ errorMessage : "" })
		}
		
	}

	render() {

		const { team1Players, team2Players, teamsSize, team1Xp, team2Xp, team1Name, team2Name } = this.props;

		return(

			<React.Fragment>

				<div className="teams_container">

					<div className="team_field1">
						<TeamField1 teamName ={ team1Name } />
					</div>

					<div className="thermometer_one">
						<Thermometer1 />
					</div>	

					<button
						className="reset_button" 
						onClick={ () => this.props.reset() } 
						>Reset
					</button>

					<div className="thermometer_two">
						<Thermometer2 />
					</div>

					<div className="team_field2">
						<TeamField2 teamName ={ team2Name } />
					</div>	

				</div>

				<form> 

					<div className="form_structure">

						{team1Players.length === teamsSize && team2Players.length === teamsSize ? 
						`Draft complete. ${team1Name} strength is ${team1Xp} and ${team2Name} is ${team2Xp}. Game on!` :
						
							<div>
								<label className="form_label" htmlFor="name">Enter Player Name</label>
								<input
									className="input_field" 
									onChange={ this.handleInputChange } 
									type="input" 
									id="name" 
									value={this.state.playerName} 
									placeholder="Player Name"
								/>
								<div>{this.state.errorMessage}</div>
							</div>

						}

					</div>

					<div className="form_structure">

						<label className="form_label" htmlFor="experience">Set Player Experience</label>
						<input

							className="slider" 
							onChange={ this.handleSliderChange } 
							id="experience" 
							type="range" 
							name="points" 
							min="1" 
							max="10" 
						/>
					</div>

					<button className="submit_button" onClick={ this.handleClick }>Submit Player</button>
					
				</form>

				
			</React.Fragment>
		)
	}
}

export default DraftScreen;

