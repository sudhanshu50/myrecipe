/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../SearchPage/SearchPage.module.css";
import { API_KEY, APP_ID, USER_API_ENDPOINT } from "../../constants";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";

const SearchPage = memo(() => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.trim() === "") {
      // Fetch default recipes (e.g., "pizza") when the query is empty
      fetch(
        `${USER_API_ENDPOINT}?q=tea&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=12`
      )
        .then((res) => res.json())
        .then((output) => setRecipes(output.hits));
    } else {
      // Fetch recipes based on the user's query
      fetch(
        `${USER_API_ENDPOINT}?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=10`
      )
        .then((res) => res.json())
        .then((output) => setRecipes(output.hits))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [query]);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setShowModal(false);
  };

  const saveHandler = (recipe) => {
    if (recipe) {
      const savedRecipes =
        JSON.parse(localStorage.getItem("savedRecipes")) || [];

      const isAlreadySaved = savedRecipes.some(
        (savedRecipe) => savedRecipe.label === recipe.label
      );

      if (!isAlreadySaved) {
        savedRecipes.push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        setSaved(true);

        setTimeout(() => {
          setSaved(false);
        }, 3000);
      } else {
        alert("Recipe is already saved.");
      }
    }
  };

  const saveHandlerOutsideModal = (recipe) => {
    saveHandler(recipe);
  };

  const saveHandlerInsideModal = () => {
    saveHandler(selectedRecipe);
  };

  return (
    <Box>
      <Box style={{ textAlign: "center" }}>
        <input
          type="text"
          value={query}
          onChange={changeHandler}
          placeholder="Enter the recipe"
          className={styles.inp}
        />
      </Box>

      {!selectedRecipe ? (
        <Box>
          {saved && (
            <Typography variant="h6" className={styles.msg}>
              Recipe saved!
            </Typography>
          )}
          <ul className={styles.box}>
            {recipes &&
              recipes.map((ele, index) => (
                <Card
                  className={styles.rBox}
                  key={index}
                  style={{ width: "18rem" }}
                >
                  <Card.Img
                    className={styles.recipeImg}
                    variant="top"
                    src={ele?.recipe?.image}
                  />
                  <Card.Body>
                    <Card.Title>{ele?.recipe?.label}</Card.Title>
                    <Card.Text>Meal Type: {ele?.recipe?.mealType}</Card.Text>
                    <Button
                      onClick={() => openModal(ele.recipe)}
                      variant="primary"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => saveHandlerOutsideModal(ele.recipe)}
                      variant="success"
                      style={{ marginLeft: "2%" }}
                    >
                      Save
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </ul>
        </Box>
      ) : (
        <Box>
          <Modal
            open={showModal}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal}>
              {saved && (
                <Typography variant="h6" className={styles.msg}>
                  Recipe saved!
                </Typography>
              )}
              <Button
                onClick={saveHandlerInsideModal}
                className={styles.saveBtn}
              >
                <SaveIcon sx={{ fontSize: 20 }} />
              </Button>
              <Button onClick={closeModal} className={styles.closeBtn}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </Button>

              {selectedRecipe && (
                <>
                  <Typography
                    className={styles.rHead}
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                  >
                    {selectedRecipe.label}
                  </Typography>
                  <img
                    // width="1rem"
                    className={styles.rImg}
                    src={selectedRecipe.image}
                    alt={selectedRecipe.label}
                  />
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                  ></Typography>
                  <ol style={{ display: "inline-block" }}>
                    <span>Ingredients:</span>
                    {selectedRecipe &&
                      selectedRecipe.ingredientLines.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                  </ol>
                </>
              )}
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
});

export default SearchPage;
