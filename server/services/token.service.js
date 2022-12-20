const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"));

    return {
      accessToken,
      refreshToken,
      expiresIn: 10000,
    };
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user, refreshToken });

    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (error) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      console.log(await Token.findOne({ refreshToken }));
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return error;
    }
  }
}

module.exports = new TokenService();
