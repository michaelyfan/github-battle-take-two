var React = require('react');

function puke(object) {
  return <pre>{JSON.stringify(object,null,' ')}</pre>
}

function ConfirmBattle(props) {
  console.log(props.playersInfo);
  return props.isLoading === true
    ? <p> LOADING </p>
    : <div> CONFIRM BATTLE: {puke(props)}</div>

}

module.exports = ConfirmBattle;
