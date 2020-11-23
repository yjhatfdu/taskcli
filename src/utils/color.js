const util = require('util')

const Foreground = {
  Black: "30",
  Red: "31", 
  Green: "32",
  Brown: "33",
  Blue: "34",
  Purple: "35",
  Cyan: "36",
  LightGray: "37"
}

const Color = (fore,text) => {
  return util.format('\x1b[%sm%s\x1b[0m',fore,text)
}

Color.Black = (text) => {
  return Color(Foreground.Black,text)
}
Color.Red = (text) => {
  return Color(Foreground.Red,text)
}
Color.Green = (text) => {
  return Color(Foreground.Green,text)
}
Color.Brown = (text) => {
  return Color(Foreground.Brown,text)
}
Color.Blue = (text) => {
  return Color(Foreground.Blue,text)
}
Color.Purple = (text) => {
  return Color(Foreground.Purple,text)
}
Color.Cyan = (text) => {
  return Color(Foreground.Cyan,text)
}
Color.LightGray = (text) => {
  return Color(Foreground.LightGray,text)
}

module.exports = {Color,Foreground}