import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItemText,
  Typography,
  ListItemButton,
  Input
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { SearchHistory } from "../../types/song.types";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  searchHistory?: SearchHistory[];
  isLoading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search for songs, artists, albums...",
  searchHistory = [],
  isLoading = false
}) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const handleClearInput = () => {
    onChange("");
    setShowHistory(false);
  };

  const handleHistoryClick = (query: string) => {
    onChange(query);
    onSearch();
    setShowHistory(false);
  };

  const handleFocus = () => {
    if (searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 200);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        margin: "0 auto"
      }}
    >
      <Input
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isLoading}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClearInput}
                edge="end"
                size="small"
                disabled={isLoading}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
      />

      {showHistory && searchHistory.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            zIndex: 100,
            width: "100%",
            maxHeight: 300,
            overflow: "auto",
            marginTop: 4
          }}
        >
          <Typography variant="subtitle2" color="textSecondary" sx={{ p: 1 }}>
            Recent Searches
          </Typography>
          <List dense>
            {searchHistory.map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleHistoryClick(item.query)}
              >
                <ListItemText
                  primary={item.query}
                  secondary={new Date(item.timestamp).toLocaleString()}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};
