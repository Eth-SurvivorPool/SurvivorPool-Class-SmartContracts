var SurviveGame = artifacts.require("./Survive.sol");

contract('Survive', function(accounts) {

    let entryFee = web3.toWei(0.1, "ether");
    let cureFee = web3.toWei(0.1, "ether");

    let killTime = 100;
    let cureTime = 0;

	let sleep = (ms) => {
		return new Promise( resolve => setTimeout(resolve, ms) );
	};

    it("Test Main Game Functions", async () => {
    	let instance = await SurviveGame.new( entryFee, cureFee, killTime, cureTime );

	    var playerAwardedEvent = instance.playerAwardedEvent();
	    var playerInfectedEvent =  instance.playerInfectedEvent();
	    var playerKilledEvent = instance.playerKilledEvent();
	    var playerBalanceUpdatedEvent = instance.playerBalanceUpdatedEvent();
	    var roundBalanceEvent = instance.roundBalanceEvent();
	    var gameSettledEvent = instance.gameSettledEvent();
	    var playerJoinedEvent = instance.playerJoinedEvent();

	    var gameData = await instance.getGameData();

	    assert.equal(gameData[0].toNumber(), entryFee, "entryFee should be " + entryFee);
	    assert.equal(gameData[1].toNumber(), cureFee, "cureFee should be " + cureFee);
	    assert.equal(gameData[2].toNumber(), 0, "roundBalance should be 0");
	    assert.equal(gameData[3].toNumber(), killTime, "cureFee should be " + killTime);
	    assert.equal(gameData[4].toNumber(), cureTime, "killTime should be " + cureTime);

	    let p1 = await instance.join({from: accounts[1], value: web3.toWei(2, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.1, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, "player 1 balance should be 1.9");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[1], 'Player 1 should be Account 1');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, 'Player 1 balance should be 1.9');

	    let p2 = await instance.join({from: accounts[2], value: web3.toWei(2, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.2, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, "player 2 balance should be 1.9");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[2], 'Player 2 should be Account 1');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, 'Player 2 balance should be 1.9');

	    let p3 = await instance.join({from: accounts[3], value: web3.toWei(2, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.3, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, "player 3 balance should be 1.9");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[3], 'Player 3 should be Account 3');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, 'Player 3 balance should be 1.9');

	    let p4 = await instance.join({from: accounts[4], value: web3.toWei(2, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.4, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, "player 4 balance should be 1.9");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[4], 'Player 4 should be Account 4');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, 'Player 4 balance should be 1.9');

	    let p5 = await instance.join({from: accounts[5], value: web3.toWei(2, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.5, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, "player 5 balance should be 1.9");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[5], 'Player 5 should be Account 5');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, 'Player 5 balance should be 1.9');

	    let p6 = await instance.join({from: accounts[6], value: web3.toWei(2, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.6, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, "player 6 balance should be 1.9");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[6], 'Player 6 should be Account 6');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 1.9, 'Player 6 balance should be 1.9');

	    let p7 = await instance.join({from: accounts[7], value: web3.toWei(0.1, "ether")});
	    assert.equal(web3.fromWei(roundBalanceEvent.get()[0].args.total.toNumber(), "ether"), 0.7, "roundBalance should be .6");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber(), "ether"), 0, "player 7 balance should be 0");
	    assert.equal(playerJoinedEvent.get()[0].args.player, accounts[7], 'Player 7 should be Account 7');
	    assert.equal(web3.fromWei(playerJoinedEvent.get()[0].args.balance.toNumber(), "ether"), 0, 'Player 7 balance should be 0');

	    var aliveCount = await instance.getAliveCount();
		assert.equal(aliveCount, 7, "There should be 7 players in the game");

	    gameData = await instance.getGameData();
	    assert.equal(web3.fromWei(gameData[2].toNumber(), "ether"), web3.fromWei(700000000000000000, "ether"), "roundBalance should be .7");

	    let i7 = await instance.infect(accounts[7]);
	    assert.equal(playerInfectedEvent.get()[0].args.owner, accounts[7], "Accounts 7 should be infected");

	    let i6 = await instance.infect(accounts[6]);
	    assert.equal(playerInfectedEvent.get()[0].args.owner, accounts[6], "Accounts 6 should be infected");

	    let i5 = await instance.infect(accounts[5]);
	    assert.equal(playerInfectedEvent.get()[0].args.owner, accounts[5], "Accounts 5 should be infected");

	    let i4 = await instance.infect(accounts[4]);
	    assert.equal(playerInfectedEvent.get()[0].args.owner, accounts[4], "Accounts 4 should be infected");

	    let i3 = await instance.infect(accounts[3]);
	    assert.equal(playerInfectedEvent.get()[0].args.owner, accounts[3], "Accounts 3 should be infected");

	    let i2 = await instance.infect(accounts[2]);
	    assert.equal(playerInfectedEvent.get()[0].args.owner, accounts[2], "Accounts 2 should be infected");

	    let infectedCount = await instance.getInfectedCount();
	    assert.equal(infectedCount, 6, "There should be 6 infected in the game");

	    let s = await sleep(101);

	    let gameResults = await instance.settleGame(true, false);

	    assert.equal(playerKilledEvent.get().length, 6, "There should be 6 players killed in this round");
	    assert.equal(web3.fromWei(playerAwardedEvent.get()[0].args.prize.toNumber(), "ether"), 0.6, "prize should be 0.6");

	    assert.equal(gameSettledEvent.get()[0].args.winners.toNumber(), 1, "winners should be 1");
	    assert.equal(web3.fromWei(gameSettledEvent.get()[0].args.prize.toNumber(), "ether"), 0.6, "prize should be 0.6");

	    var aliveCount = await instance.getAliveCount();
	    assert.equal(aliveCount, 1, "There should only be 1 player alive");

	    let gameReset = await instance.resetGame();
	    aliveCount = await instance.getAliveCount();
	    assert.equal(aliveCount, 6, "There should only be 6 players alive");

	    infectedCount = await instance.getInfectedCount();
	    assert.equal(infectedCount, 0, "There should be 0 infected in the game");

	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[0].args.balance.toNumber()), 1.8, "player 1 balance should be 1.8");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[1].args.balance.toNumber()), 1.8, "player 2 balance should be 1.8");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[2].args.balance.toNumber()), 1.8, "player 3 balance should be 1.8");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[3].args.balance.toNumber()), 1.8, "player 4 balance should be 1.8");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[4].args.balance.toNumber()), 1.8, "player 5 balance should be 1.8");
	    assert.equal(web3.fromWei(playerBalanceUpdatedEvent.get()[5].args.balance.toNumber()), 1.8, "player 6 balance should be 1.8");

	    var player7 = await instance.getPlayer(accounts[7]);

	    assert.equal(player7[0], accounts[7], 'Player 7 should by Accounts 7');
	    assert.equal(player7[1], false, 'Player 7 should isAlive should be false');
	    assert.equal(player7[2], false, 'Player 7 should isInfected should be false');
	    assert.equal(player7[3].toNumber(), 0, 'Player 7 should infectedTime should be 0');
	    assert.equal(player7[4].toNumber(), 0, 'Player 7 should immuneTime should be 0');
	    assert.equal(player7[5].toNumber(), 0, 'Player 7 should balance should be 0');
	    assert.equal(player7[6], true, 'Player 7 should initialized should be true');
    });

	it("Test Owner Game Functions", async () => {
		let instance = await SurviveGame.new( entryFee, cureFee, killTime, cureTime );

		var gameData = await instance.getGameData();

		assert.equal(gameData[0].toNumber(), entryFee, "entryFee should be " + entryFee);
		assert.equal(gameData[1].toNumber(), cureFee, "cureFee should be " + cureFee);
		assert.equal(gameData[2].toNumber(), 0, "roundBalance should be 0");
		assert.equal(gameData[3].toNumber(), killTime, "cureFee should be " + killTime);
		assert.equal(gameData[4].toNumber(), cureTime, "killTime should be " + cureTime);


		var paused = await instance.getPauseState();

		assert.equal(paused, false, "Game should not be pause");

		paused = await instance.pause();

		paused = await instance.getPauseState();

		assert.equal(paused, true,  "Game should be pause");

		let newEntryFee = web3.toWei(0.2, "ether");
		let newCureFee = web3.toWei(0.2, "ether");

		let newKillTime = 200;
		let newCureTime = 200;

		gameData = await instance.updateGameRules(newEntryFee, newCureFee, newKillTime, newCureTime);

		gameData = await instance.getGameData();

		assert.equal(gameData[0].toNumber(), newEntryFee, "entryFee should be " + entryFee);
		assert.equal(gameData[1].toNumber(), newCureFee, "cureFee should be " + cureFee);
		assert.equal(gameData[2].toNumber(), 0, "roundBalance should be 0");
		assert.equal(gameData[3].toNumber(), newKillTime, "cureFee should be " + killTime);
		assert.equal(gameData[4].toNumber(), newCureTime, "killTime should be " + cureTime);

		paused = await instance.unpause();

		paused = await instance.getPauseState();

		assert.equal(paused, false, "Game should not be pause");

	});

	it("Test Payable Fallback", async () => {
		let instance = await SurviveGame.new( entryFee, cureFee, killTime, cureTime );

		var playerJoinedEvent = instance.playerJoinedEvent();

		let p1 = await instance.sendTransaction({from:accounts[1], value: web3.toWei(0.5, "ether")});
		var p1Event = playerJoinedEvent.get()[0].args;
		assert.equal(p1Event.player, accounts[1], 'Player 1 should be Account 1');
		assert.equal(web3.fromWei(p1Event.balance.toNumber(), "ether"), 0.4, 'Player 1 balance should be 0.4');

		let p2 = await instance.sendTransaction({from:accounts[2], value: web3.toWei(0.5, "ether")});
		var p2Event = playerJoinedEvent.get()[0].args;
		assert.equal(p2Event.player, accounts[2], 'Player 2 should be Account 2');
		assert.equal(web3.fromWei(p2Event.balance.toNumber(), "ether"), 0.4, 'Player 2 balance should be 0.4');
	});

});
