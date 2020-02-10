const utils = require("./Utils")

utils.InitializeField()

while (!utils.CheckGameState()) {
    utils.GetUserInput()
    utils.ShowField()
}