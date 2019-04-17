import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import Track from './Track'
import {Button} from '@rmwc/button'
import ProgressBar from 'react-bootstrap/ProgressBar'
export default class GeneratePlaylist extends Component {
  /*
    state = {
        query: null,
        tracksMap: null,
        libraryMap: null
    }*/
    

    query
    userTracks
    componentDidMount = () => {
      this.query = this.props.query
      this.userTracks = Array.from(this.props.userTracks,track => track.track.uri)

      console.log(this.userTracks)
      var queryString = ""
      
      this.query.keywords.forEach((keyword,index) => {
        queryString += keyword
        if(index != this.query.keywords.length - 1) queryString += " OR "
      })

      this.createPlaylistFromTopTrackFrequencies(queryString,250)
    }

    updateGUI = () => {
      if(this.freqs !== undefined) {
        this.setState(() => ({
          series: [{
            name: 'Track Frequency',
            data: Array.from(this.freqs.values(), (track) => track.frequency).slice(0,100)
          }]
        ,
          options: {...this.state.options, xaxis: {
            categories: Array.from(this.freqs.values(), (track) => track.artists[0].name + " - " + track.name).slice(0,100)
          }}
          ,
        tracks: Array.from(this.freqs.values()).slice(0,100)
      }))
      }
    }

    constructor(props) {
      super(props)
      setInterval(() => {
        this.updateGUI()
      },750)
    }
    state = {
      tracks: [],
      progress: {
        value:0,
        max: 100
      },
      options: {
        title: {
          text: "Top 100 Track Frequencies",
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '18px',
            color:  '#263238',
          }
        },
        chart: {
          id: 'tracks',
        },
        xaxis: {
          categories: []
        },
        plotOptions: {
          bar: {
            horizontal: true,
            endingShape: 'rounded'
          }
        },
        fill: {
          colors:['#4df747'],
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: ['#3fe539'],
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
      },
     
      series: [{
        name: 'Track Frequency',
        data: []
      }],
      
    }


    getPlaylists = async (name,limit) => {
      var initialValue = 0;
      var promises = []
      var list = [];

      for(var i = 0; i < limit; i += 50){
          promises.push( this.props.api.searchPlaylists(name,{limit: 50,offset: i}).then((res) => {
              list = [...list, ...res.playlists.items]
          }))
      }
     

      return Promise.all(promises).then(() => {
          return list
      })
  }

  deletedTracks
  deletedArtists
  tracks
  freqs
  stop
  componentWillUnmount() {
    this.stop = true
  }
  createPlaylistFromTopTrackFrequencies = async (playlistName,numberOfPlaylists) => {
    this.uri2trackname = new Map()
    this.freqs = new Map();
    this.deletedTracks = []
    this.deletedArtists = []
    this.stop = false
    return this.getPlaylists(playlistName,numberOfPlaylists).then((res) => {
        var doStuff = async () => {

            await this.setState(() => ({tracksMap: this.freqs}))
            let playlists = res;
            console.log(playlists)
            var promises = []    
            var playlistTracks = []
            const delay = (interval) => new Promise(resolve => setTimeout(resolve, interval));

            for(var i = 0; i < playlists.length; i++) {
                if(this.stop) return;
                var playlist = playlists[i];
                await this.setState( () => ({
                    progress: {
                        value: i + 1,
                        max: playlists.length
                    }
                }))
                await delay(25)
                promises.push(this.props.api.getPlaylistTracks(playlist.id).then((res) => {
                    playlistTracks = [...playlistTracks, ...res.items ]
                    this.tracks = playlistTracks;
                    res.items.forEach((track) => {
        
                      track = track.track;
                      if(track === null || track.uri === null) return;

                      var trackValid = true

                      if(this.deletedTracks.includes(track.uri)) trackValid = false;
                      if(this.deletedArtists.includes(track.artists[0].uri)) trackValid = false;

                      if(this.props.query !== undefined || this.props.query !== null) {
                        //do query calculations :))
                        if(track.popularity <= this.query.popMin || track.popularity >= this.query.popMax) trackValid = false
                        
                        if(!this.query.includeExplicit && track.explicit) trackValid = false;

                        if(!this.query.includeLibrary && this.userTracks.includes(track.uri)) trackValid = false;
                        
                      }

                      if(trackValid) {

                        if(this.freqs.get(track.uri) === undefined) {
                          this.freqs.set(track.uri,{
                            uri: track.uri,
                            name: track.name,
                            artists: track.artists, 
                            frequency: 1,
                            img: (track.album !== undefined && track.album.images !== undefined && track.album.images[0] !== undefined) ? track.album.images[0].url : undefined
                          })
                        }
                        else {
                          this.freqs.set(track.uri,{...this.freqs.get(track.uri), frequency: this.freqs.get(track.uri).frequency + 1})
                        }
                      }
                      
                    })


                    //sort freqs
                    this.freqs = new Map([...this.freqs.entries()].sort((a,b) => {
                      return a[1].frequency < b[1].frequency ? 1: a[1].frequency > b[1].frequency ? -1 : 0
                    }));

                }, async () => {
                    await delay(25)
                    i--;
                }))
                
            }
            
          


            return Promise.all(promises).then(() => {

                return this.freqs
                
            })
            
        }

        return doStuff()
        
    })
    
}

  deleteSong = (uri,update) => {
    console.log('deleting ' + uri)
    if(this.freqs.has(uri)){
      this.deletedTracks.push(uri)
      this.freqs.delete(uri)
      if(update) this.updateGUI();
    }
  }

  deleteArtist = (artistURI) => {
    console.log('deleting ' + artistURI)

    this.tracks.forEach((track) => { 
      track = track.track
      if(track === null || track.uri === null) return;
      if(this.freqs.has(track.uri)) {
        if(track.artists[0].uri === artistURI) this.deleteSong(track.uri,false)
      }
    })

    if(artistURI !== undefined) this.deletedArtists.push(artistURI)
    this.updateGUI()

  }


  generatePlaylist = () => {
    console.log('creating playlist')

    var name = ""
    this.query.keywords.forEach((keyword,index) => {
      name += keyword
      if(index !== this.query.keywords.length - 1) name += ", "
      else name += " "
    })

    name += " (PeopleTheDJ)"

    this.props.api.createPlaylist(this.props.user.id,{name,public: true, description:"This playlist was generated by PeopleTheDJ, a playlist generating application built by Alex Chomiak. PeopleTheDJ takes in certain keywords, searches Spotify for the top 500 playlists containing that keyword, then curates a playlist from the songs that occur most in each of those playlists. Try it out! :)"}).then((playlist) => {
      const id = playlist.id
      let trackIDs = Array.from(this.freqs.keys()).splice(0,100)

      this.props.api.addTracksToPlaylist(id,trackIDs)
    })
    this.props.resetQuery();
  }

  render() {
    
    
    return (
  
      <div className="generator">

        
          {this.state.progress.value !== this.state.progress.max ?
          (<h3 className="generate-prompt"> Generating Playlist from&nbsp;
 
            {this.props.query !== null && this.props.query.keywords.map((keyword,index) => {
             var string = keyword;
              if(index != this.props.query.keywords.length - 1) string += ", "
              return string;
            })}
            ...
          </h3>) :
          (<h3 className="generate-prompt"> Playlist Generated!</h3>)
          }
        <div className="row justify-content-md-center">
        <ProgressBar variant='success' style={{width: '100%',marginBottom:'1rem'}} now={ (this.state.progress.value / this.state.progress.max) * 100 }  />

        
        </div>

        <div className="row justify-content-md-center">
          <div className="playlistGenerator col-sm-5">
          <div className="row create--btn">
          <Button style={{marginBottom: "1rem"}} onClick={() => {this.generatePlaylist()}} disabled={this.state.progress.value !== this.state.progress.max} style={{width:'100%'}} label="Add Playlist to Your Spotify"></Button>
          <Button style={{marginBottom: "1rem"}} onClick={() => {this.props.resetQuery()}}  style={{width:'100%'}} label="Search Something else."></Button>

          </div>
          {/*
            <Track artists={[{name: "J.Cole"}]} title="Middle Child" number={1}/>
          */}
            {this.state.tracks.map((track,index) => {
              return (<Track deleteSong={this.deleteSong} deleteArtist={this.deleteArtist} key={index} img={track.img} number={index+1} uri={track.uri} title={track.name} artists={track.artists}></Track>)
            })}
         
        </div>
        <div className="col-sm-7">
        <Chart  options={this.state.options} series={this.state.series} plotOptions={this.state.plotOptions} type="bar" width={'100%'} height={2500} />

        </div>

      
        </div>

        </div>
        
        
    )
  
  
  }
}
