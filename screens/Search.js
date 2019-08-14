import react from "react";
import SearchBar from "react-native-elements";

searchFilterFunction = text => {
  const newData = this.arrayholder.filter(item => {
    const itemData = `${item.name.title.toUpperCase()}
    ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;

    const textData = text.toUpperCase();

    return itemData.indexOf(textData) > -1;
  });

  this.setState({ data: newData });
};

renderHeader = () => {
  return (
    <SearchBar
      placeholder="Type Here..."
      lightTheme
      round
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
    />
  );
};
