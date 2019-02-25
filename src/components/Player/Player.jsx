import React from 'react';
//import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import './Player.scss'

// Player
class Player extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            playStatus: 'play',
            currentTime: 0
        }
    };

    updateTime = (timestamp) => {
        timestamp = Math.floor(timestamp);
        this.setState({ currentTime: timestamp });
    };
    updateScrubber = (percent) => {
        // Set scrubber width
        let innerScrubber = document.querySelector('.Scrubber-Progress');
        innerScrubber.style['width'] = percent;
    };
    togglePlay = () => {
        console.log(`Playback Status: ${this.state.playStatus}`)

        let status = this.state.playStatus;
        let audio = document.getElementById('audio');
        if (status === 'play') {
            status = 'pause';
            audio.play();
            let that = this;
            setInterval(function () {
                let currentTime = audio.currentTime;
                let duration = that.props.song.duration;

                // Calculate percent of song
                let percent = (currentTime / duration) * 100 + '%';
                that.updateScrubber(percent);
                that.updateTime(currentTime);
            }, 100);
        } else {
            status = 'play';
            audio.pause();
        }
        this.setState({ playStatus: status });

    }
    render = () => {
        return (
            <div className="Player">
                <div className="Background" style={{ 'backgroundImage': 'url(' + this.props.song.artwork + ')' }}></div>
                <div className="Header"><div className="Title">Current track</div></div>
                <div className="Artwork" style={{ 'backgroundImage': 'url(' + this.props.song.artwork + ')' }}></div>
                <TrackInformation song={this.props.song} />
                <Scrubber isPlaying={this.state.playStatus} />
                <Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
                <Timestamps duration={this.props.song.duration} currentTime={this.state.currentTime} />
                <audio id="audio">
                    <source src={this.props.song.source} />
                </audio>
            </div>
        )
    };

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
        className = this.props.isPlaying === 'pause' ?
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

        if (this.props.isPlaying === 'pause') {
            classNames = 'fa pause';
            contextIcon = faPause
        } else {
            classNames = 'fa play';
            contextIcon = faPlay
        }

        return (
            <div className="Controls">
                <div onClick={this.props.onClick} className="Button">
                    <FontAwesomeIcon icon={contextIcon} size='2x' className={classNames} />
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