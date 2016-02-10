import React, { Component } from 'react';

class HomePage extends Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <pre>State: {JSON.stringify(this.state)}</pre>
      </div>
    );
  }
}

export default HomePage;
