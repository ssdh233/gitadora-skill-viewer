import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Downshift from "downshift";

function stateReducer(state, changes) {
  // this prevents the input from being clear on blur
  switch (changes.type) {
    case Downshift.stateChangeTypes.blurInput:
    case Downshift.stateChangeTypes.touchEnd:
    case Downshift.stateChangeTypes.mouseUp:
      return { ...state, isOpen: false };
    default:
      return changes;
  }
}

function SearchBox(props) {
  const { suggestionsData } = props;

  let suggestions =
    suggestionsData &&
    suggestionsData.sharedSongSuggestions &&
    suggestionsData.sharedSongSuggestions.filter(suggestion =>
      suggestion.includes(props.inputValue)
    );

  return (
    <Downshift
      stateReducer={stateReducer}
      id="searchBox"
      onChange={value => {
        props.onChangeInputValue(value);
        props.onFetchSharedSongs(props.inputValue);
      }}
      inputValue={props.inputValue}
      onInputValueChange={value => props.onChangeInputValue(value)}
    >
      {({ getRootProps, getInputProps, getItemProps, isOpen, openMenu }) => {
        return (
          <Container {...getRootProps({ suppressRefError: true })}>
            <TextField
              label="曲名で検索"
              margin="dense"
              variant="outlined"
              fullWidth
              InputProps={{
                style: { padding: 0 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => props.onFetchSharedSongs(props.inputValue)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...getInputProps({
                onFocus: openMenu
              })}
            />
            {isOpen && suggestions && (
              <StyledPaper square>
                {suggestions.slice(0, 20).map((item, index) => (
                  <MenuItem
                    key={index}
                    {...getItemProps({
                      index,
                      item
                    })}
                  >
                    {item}
                  </MenuItem>
                ))}
              </StyledPaper>
            )}
          </Container>
        );
      }}
    </Downshift>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 20px 10px;
`;

const StyledPaper = styled(Paper)`
  position: absolute;
  width: 100%;
  top: 52px;
  max-height: 240px;
  overflow: scroll;
`;

export default SearchBox;
