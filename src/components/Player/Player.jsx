import React from 'react';
import ReactDOM from 'react-dom';

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

    updateTime(timestamp) {
        timestamp = Math.floor(timestamp);
        this.setState({ currentTime: timestamp });
    };
    updateScrubber(percent) {
        // Set scrubber width
        let innerScrubber = document.querySelector('.Scrubber-Progress');
        innerScrubber.style['width'] = percent;
    };
    togglePlay() {
        console.log(this)
        let status = this.state.playStatus;
        let audio = document.getElementById('audio');
        if (status === 'play') {
            status = 'pause';
            audio.play();
            let that = this;
            setInterval(function () {
                let currentTime = audio.currentTime;
                let duration = that.props.track.duration;

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
    render() {
        return (
            <div className="Player">
                <div className="Background" style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}></div>
                <div className="Header"><div className="Title">Now playing</div></div>
                <div className="Artwork" style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}></div>
                <TrackInformation track={this.props.track} />
                <Scrubber />
                <Controls isPlaying={this.state.playStatus} onClick={this.togglePlay.bind(this)} />
                <Timestamps duration={this.props.track.duration} currentTime={this.state.currentTime} />
                <audio id="audio">
                    <source src={this.props.track.source} />
                </audio>
            </div>
        )
    };

}
Player.defaultProps = {
    track: {
        name: "Angel Voices",
        artist: "VIRTUAL SELF",
        album: "",
        year: 2018,
        artwork: "https://m.media-amazon.com/images/I/71VJ6MxpN8L._SS500_.jpg",
        duration: 392,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
    }
};

class TrackInformation extends React.Component {
    render() {
        return (
            <div className="TrackInformation">
                <div className="Name">{this.props.track.name}</div>
                <div className="Artist">{this.props.track.artist}</div>
                <div className="Album">{this.props.track.album} ({this.props.track.year})</div>
            </div>
        )
    }
};

class Scrubber extends React.Component {
    render() {
        return (
            <div className="Scrubber">
                <div className="Scrubber-Progress"></div>
            </div>
        )
    }
};

class Controls extends React.Component {
    render() {

        let classNames;
        if (this.props.isPlaying === 'pause') {
            classNames = 'fa fa-fw fa-pause';
        } else {
            classNames = 'fa fa-fw fa-play';
        }

        return (
            <div className="Controls">
                <div onClick={this.props.onClick} className="Button">
                    <i className={classNames}></i>
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
ReactDOM.render(
    <Player />,
    document.querySelector('body')
);

export default { Player, TrackInformation, Scrubber, Controls, Timestamps }