import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import styles from "../SavedRecipe/SavedRecipe.module.css";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";

const SavedRecipe = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/");
  };

  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  );

  const deleteRecipe = (index) => {
    const updatedRecipes = [...favoriteRecipes];
    updatedRecipes.splice(index, 1);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    setFavoriteRecipes(updatedRecipes);
  };

  useEffect(() => {
    const storedRecipes =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setFavoriteRecipes(storedRecipes);
  }, []);

  return (
    <>
      <NavBar />
      <Box>
        <Button onClick={backHandler} className={styles.backBtn}>
          <ArrowBackSharpIcon sx={{ fontSize: 40 }} />
        </Button>
        {favoriteRecipes.length > 0 ? (
          <>
            <Typography className={styles.head} variant="h4">
              Favourite Recipes
            </Typography>
            <Box className={styles.box1}>
              {favoriteRecipes.map((favoriteRecipe, index) => (
                <Card className={styles.recipeBox} key={index}>
                  <Card.Img
                    className={styles.recipeImg}
                    variant="top"
                    src={favoriteRecipe?.image}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title>{favoriteRecipe?.label}</Card.Title>
                    <Card.Text>Meal Type: {favoriteRecipe?.mealType}</Card.Text>
                    <a
                      className={styles.brief}
                      target="_blank"
                      rel="noreferrer"
                      href={favoriteRecipe.url}
                    >
                      Learn More
                    </a>
                    |
                    <Button
                      variant="danger"
                      onClick={() => deleteRecipe(index)}
                      style={{ color: "blue", padding: "0", marginLeft: "1%" }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Box>
          </>
        ) : (
          <Typography className={styles.msg}>
            No saved recipes. Search for and save recipes!
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SavedRecipe;
