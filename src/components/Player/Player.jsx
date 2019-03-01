import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepForward, faStepBackward, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './Player.scss'
import songlist from '../../resources/songlist.json'

import App from '../../App.jsx';
// Player
class Player extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            playStatus: 'pause',
            currentTime: 0,

            song: props.song
        }
    };

    componentDidMount() {
        document.body.style.background = "-webkit-linear-gradient(top, rgba(36,36,36,1) 0%,rgba(42,42,42,1) 12%,rgba(48,48,48,1) 25%,rgba(33,33,33,1) 39%,rgba(21,21,21,1) 50%,rgba(0,0,0,1) 51%,rgba(8,8,8,1) 60%,rgba(20,20,20,1) 76%,rgba(13,13,13,1) 91%,rgba(9,9,9,1) 100%)";
    }


    /*  Visualizations  */
    timeVisual = 0;
    updateTime = (timestamp) => {
        timestamp = Math.floor(timestamp);
        this.setState({ currentTime: timestamp });
    };
    updateScrubber = (percent) => {
        // Set scrubber width
        let innerScrubber = document.querySelector('.Scrubber-Progress');
        innerScrubber.style['width'] = percent;
    };

    /*  Media Control functions */
    //  Toggles playback of current track. (Optionally force to play setting hotSwap to 'force)
    togglePlay = (hotSwap = 'none') => {
        console.log(`Playback status before: ${this.state.playStatus}`)

        let status = this.state.playStatus;
        let audio = document.getElementById('audio');
        if (status === 'pause' || hotSwap === 'force') {
            status = 'play';
            audio.play();
            let that = this;
            this.timeVisual = setInterval(() => {
                let currentTime = audio.currentTime;
                let duration = that.state.song.duration;

                // Calculate percent of song
                let percent = (currentTime / duration) * 100 + '%';
                that.updateScrubber(percent);
                that.updateTime(currentTime);
            }, 100);
        } else {
            status = 'pause';
            audio.pause();
        }
        this.setState({ playStatus: status });

    }
    stopAudio = () => {
        //  If music isn't already paused
        if (this.state.playStatus === 'play') this.togglePlay()

        let audio = document.getElementById('audio');
        audio.currentTime = 0;

        this.updateScrubber(0);
        this.updateTime(0);

        clearInterval(this.timeVisual);
    }

    /*  Screen Transitions  */
    switchTrack = (context) => {
        var index = songlist.findIndex((matched_id) => {
            console.log(matched_id)
            return matched_id.id === this.state.song.id
        });

        if (context === 'previous') {
            console.log('Previous song')

            index = (index - 1 === -1) ? songlist.length - 1 : index - 1;
        }
        if (context === 'next') {
            console.log('Next song')

            index = (index + 1 === songlist.length) ? 0 : index + 1;
        }

        //  Stop music ahead of switch
        let previousPlayState = this.state.playStatus
        this.stopAudio();

        //  Update to new source
        console.log(`Switched to song with id of ${songlist[index].id}`)
        this.setState({ song: songlist[index] })
        let audio = document.getElementById('audio');
        audio.src = songlist[index].source

        //  Plays next song if music player was already playing
        if (previousPlayState === 'play') this.togglePlay('force');
    }


    returnToSongList = () => {
        ReactDOM.render(<App />, document.getElementById('root'))
    }

    /*  Render  */
    render = () => {
        return (
            <div className="Player" id='player'>
                <div className="Background" style={{ 'backgroundImage': 'url(' + this.state.song.artwork + ')' }}></div>
                <div className="Header">
                    <p className="fa back" onClick={this.returnToSongList}>
                        <FontAwesomeIcon icon={faArrowLeft} size='2x' style={{ opacity: '.8' }} />
                    </p>
                    <div className="Title">Current track</div>
                    <p className="fa back" onClick={() => console.log('honk honk mystery button')}>
                        <FontAwesomeIcon icon={faArrowLeft} size='2x' style={{ opacity: '0' }} />
                    </p>
                </div>
                <div className="Artwork" style={{ 'backgroundImage': 'url(' + this.state.song.artwork + ')' }}></div>
                <TrackInformation song={this.state.song} />
                <Scrubber isPlaying={this.state.playStatus} />
                <Controls isPlaying={this.state.playStatus}
                    onClick={{ togglePlay: this.togglePlay, switchTrack: this.switchTrack }} />
                <Timestamps duration={this.state.song.duration} currentTime={this.state.currentTime} />
                <audio id="audio">
                    <source src={this.state.song.source} />
                </audio>
            </div>
        )
    };

    componentWillUnmount() {
        if (this.state.playStatus === 'play') this.togglePlay()
        document.body.style.background = "";

        console.log(`Navigating back to song list... `)

        this.currentTime = 0;
        clearInterval(this.timeVisual);
    }
}
Player.defaultProps = {
    song: {
        name: "Some song",
        artist: "Some arti- wait",
        album: "How did we get here",
        year: 3019,
        artwork: "https://m.media-amazon.com/images/I/71VJ6MxpN8L._SS500_.jpg",
        duration: 392,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
    }
};

class TrackInformation extends React.Component {
    render() {
        return (
            <div className="TrackInformation">
                <div className="Name">{this.props.song.name}</div>
                <div className="Artist">{this.props.song.artist}</div>
                <div className="Album">{this.props.song.album} ({this.props.song.year})</div>
            </div>
        )
    }
};

class Scrubber extends React.Component {
    render() {
        let className;
        className = this.props.isPlaying === 'play' ?
            'Scrubber-Progress play' : 'Scrubber-Progress pause'

        return (
            <div className="Scrubber">
                <div className={className}></div>
            </div>
        )
    }
};

class Controls extends React.Component {

    render() {
        let classNames;
        let contextIcon;

        if (this.props.isPlaying === 'play') {
            classNames = 'fa pause';
            contextIcon = faPause
        } else {
            classNames = 'fa play';
            contextIcon = faPlay
        }

        return (
            <div className="Controls">
                <div onClick={() => this.props.onClick.switchTrack('previous')} className="Button Change">
                    <FontAwesomeIcon icon={faStepBackward} size='2x' />
                </div>
                <div onClick={this.props.onClick.togglePlay} className="Button Play">
                    <FontAwesomeIcon icon={contextIcon} size='2x' className={classNames} />
                </div>
                <div onClick={() => this.props.onClick.switchTrack('next')} className="Button Change">
                    <FontAwesomeIcon icon={faStepForward} size='2x' />
                </div>
            </div>
        )
    }
};

class Timestamps extends React.Component {
    convertTime(timestamp) {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        timestamp = minutes + ':' + seconds;
        return timestamp;
    }
    render() {
        return (
            <div className="Timestamps">
                <div className="Time Time--current">{this.convertTime(this.props.currentTime)}</div>
                <div className="Time Time--total">{this.convertTime(this.props.duration)}</div>
            </div>
        )
    }
};


// Render the UI


export default Player