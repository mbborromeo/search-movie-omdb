const ListItems = ({ items, classname }) => {
  return (
    <ul className={classname ? classname : ""}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default ListItems;
