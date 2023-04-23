const token = localStorage.getItem("token Sophie Bluel");

// temps  de validité du token pour faire apparaître ou non les fonctionnalités d'admin
if (token) {
    var tokenData = jwt_decode(token);
    var tokenExpiracy = tokenData.exp - Date.now() / 1000;
  }