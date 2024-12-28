import axios from "axios";
import { Descendant } from "slate";

//login & register
export const userLogin = async (userName: string, userPassword: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/login",
      {
        userName,
        userPassword,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const userRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  userPassword: string
) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/register", {
      firstName,
      lastName,
      email,
      userName,
      userPassword,
    });

    return response;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//user
export const getAllUser = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/users", {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const getUser = async (id: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const updateUser = async (
  id: string | number | undefined,
  userName: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  email: string | undefined
) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/user/${id}`,
      {
        userName,
        firstName,
        lastName,
        email,
      },
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//content
export const getAllContent = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/contents", {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const saveContent = async (
  id: number,
  content: Descendant[] | undefined,
  categories: string[]
) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/content",
      {
        user_id: id,
        content: content,
        categories: categories,
      },
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const updateContent = async (
  blog_id: string | number,
  content: Descendant[] | undefined,
  categories: string[]
) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/api/v1/content",
      {
        blog_id: blog_id,
        content: content,
        categories: categories,
      },
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const getContentByUserID = async (id: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/contents/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const getContentByBlogID = async (
  blog_id: string | number,
  user_id: string | number
) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/content/${blog_id}`,
      {
        params: {
          user_id,
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const deleteContentByBlogID = async (blog_id: string | number) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/content/${blog_id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//category
export const getAllCategory = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/category", {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const getTopCategory = async (limit = 10) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/category/${limit}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//follow
export const getFollowingByID = async (user_id: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/follow/${user_id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const getTopFollower = async (limit: number = 10) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/follow`, {
      params: {
        limit,
      },
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const saveFollow = async (
  user_id: string | number,
  follow_id: string | number
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/follow`,
      {
        user_id: user_id,
        follow_id: follow_id,
      },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const saveUnFollow = async (
  user_id: string | number,
  follow_id: string | number
) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/follow`, {
      data: {
        user_id: user_id,
        follow_id: follow_id,
      },
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//favorite
export const getFavoriteByID = async (user_id: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/favorite/${user_id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const saveFavorite = async (
  user_id: string | number,
  blog_id: string | number
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/favorite`,
      {
        user_id: user_id,
        blog_id: blog_id,
      },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const unSaveFavorite = async (
  user_id: string | number,
  blog_id: string | number
) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/favorite`,
      {
        data: {
          user_id: user_id,
          blog_id: blog_id,
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//bookmark
export const getBookmarkByID = async (user_id: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/bookmark/${user_id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const saveBookmark = async (
  user_id: string | number,
  blog_id: string | number
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/bookmark`,
      {
        user_id: user_id,
        blog_id: blog_id,
      },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const unSaveBookmark = async (
  user_id: string | number,
  blog_id: string | number
) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/bookmark`,
      {
        data: {
          user_id: user_id,
          blog_id: blog_id,
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

//comment
export const getCommentByID = async (content_id: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/comment/${content_id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
export const postComment = async (
  user_id: string | number,
  blog_id: string | number,
  content: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/comment`,
      {
        user_id,
        blog_id,
        content,
      },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};
