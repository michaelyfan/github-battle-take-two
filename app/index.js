//cd Desktop/"Code projects"/"Beginner react"/github-battle-take-two

var USER_DATA = {
  name: 'Gordon Ramsay',
  username: 'Gordon_Ramsay',
  image: 'http://www.myfoxspokane.com/wp-content/uploads/2016/05/CroppedFocusedImage160055050-50-gordon-ramsay-2.jpg'
}

var React = require('react');
var ReactDOM = require('react-dom');

var ProfilePic = React.createClass({
  render: function() {
    return <img src={this.props.imageUrl} />
  }
});

var ProfileName = React.createClass({
  render: function() {
    return (
      <div>{this.props.name}</div>
    )
  }
});

var ProfileLink = React.createClass({
  render: function() {
    return (
      <div>
        <a href={'https://en.wikipedia.org/wiki/' + this.props.username}>
          {this.props.username}
        </a>
      </div>
    )
  }
});

var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <ProfilePic imageUrl={this.props.user.image} />
        <ProfileName name={this.props.user.name} />
        <ProfileLink username={this.props.user.username} />
      </div>
    )
  }
})

ReactDOM.render(
  <Avatar user={USER_DATA} />,
  document.getElementById('app')
);
