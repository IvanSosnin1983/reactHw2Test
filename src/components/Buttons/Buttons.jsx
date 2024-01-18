const Buttons = ({ names, pressButton }) =>
  names.map(name => (
    <button type="button" key={name} onClick={() => pressButton(name)}>
      {name}
    </button>
  ));
export default Buttons;
