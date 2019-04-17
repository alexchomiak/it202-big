import React,{Component} from 'react'
import { Button } from '@rmwc/button';

export default class Track extends Component {

render(){  
return (
    <div className="track row">
 

    
        <div className="col-sm-2">
        { (this.props.img === undefined) ?
        (<img className= "track--img" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0441c1c5-1d8c-4795-bd2b-09d00f49ab64/day4crn-500cb08a-3e2a-49d9-93c7-23a2f534ebba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA0NDFjMWM1LTFkOGMtNDc5NS1iZDJiLTA5ZDAwZjQ5YWI2NFwvZGF5NGNybi01MDBjYjA4YS0zZTJhLTQ5ZDktOTNjNy0yM2EyZjUzNGViYmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EqdBDCHlgUGyMye2pNXiLiTuOUIPWxaev6NuBd2kpy0"/>)
        : (<img src={this.props.img} className="track--img"/>)  
        }
        </div>

        <div className="col-sm-4">
                <h3 className="track--name">{this.props.number}. {this.props.title}</h3>
 
     
                <h6 className="track--artist"> <i> {this.props.artists.map((artist,index) => {
                    var string = artist.name
                    if(index != this.props.artists.length - 1) string +=", "
                    return string;
                })}</i></h6>
            
        </div>



    <div className="col-sm-6 row">
    <div className="col-xs-6">
        <button onClick={() => {this.props.deleteArtist(this.props.artists[0].uri)}} className="btn btn-outline-danger track--btn "> Remove Artist </button>
    </div>
    <div className="col-xs-6">
        <button onClick ={() =>{this.props.deleteSong(this.props.uri,true)}} className="btn btn-outline-danger track--btn "> Remove Track</button>
    </div>
    </div>
    

</div>
    

  )
}
}
