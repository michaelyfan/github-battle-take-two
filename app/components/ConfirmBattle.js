var React = require('react');

function ConfirmBattle(props) {
  console.log(props.playersInfo);
  return props.isLoading === true
    ? <p> LOADING </p>
    : <p> CONFIRM BATTLE </p>

}

module.exports = ConfirmBattle;
