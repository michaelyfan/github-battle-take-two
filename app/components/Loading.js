import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  componentDidMount() {
    const { text, interval } = this.props;
    const stopper = text + '...';

    this.interval = window.setInterval(() => {
      text === stopper
        ? this.setState(() => ({text: text}))
        : this.setState(({ text }) => ({text: text + '.'}))
    }, interval)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  interval: 300
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  interval: PropTypes.number.isRequired
}

export default Loading;