console.log('wazzup')

const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    health: 100
  },
  {
    name: 'Swift Ironstag',
    type: 'elf',
    damage: 10,
    health: 50
  }
]

const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  gold: 5
}

let partyGold = 0

let monsterCount = 0

function attackBoss() {
  let damage = 0
  heroes.forEach(hero => damage += hero.damage)
  boss.health -= damage
  checkBoss()
  // console.log(damage, boss.health)
}

function attackHeroes() {
  heroes.forEach(hero => hero.health -= boss.damage)
  // console.log(heroes)
  let partyHealth = 0
  heroes.forEach(hero => {
    if (hero.health <= 0) { hero.health = 0 }
    partyHealth += hero.health
  })
  drawParty()
  if (partyHealth <= 0) {
    // console.log('you lose')
    setTimeout(() => {
      alert('Your Gold are belong to us')
    })
  }
}

function checkBoss() {
  if (boss.health <= 0) {
    partyGold += boss.gold * boss.level
    boss.level++
    boss.maxHealth += 20
    boss.health = boss.maxHealth
    monsterCount++
  }
  console.log(boss)
  drawBoss()
  drawPartyGold()
}


function drawBoss() {
  let bossHealth = document.getElementById('bossHealth')
  bossHealth.innerText = boss.health
  let healthPercent = boss.health / boss.maxHealth * 100
  let healthBar = document.getElementById('healthBarBoss')
  healthBar.innerHTML = `<div class="progress-bar healthBarBoss" style="width: ${healthPercent}%"></div>`
  let bossLevel = document.getElementById('bossLevel')
  bossLevel.innerText = boss.level
  let monstersSlain = document.getElementById('monsterCount')
  monstersSlain.innerText = monsterCount
}

function drawPartyGold() {
  let gold = document.getElementById('partyGold')
  gold.innerText = partyGold
}

function healHero(heroName) {
  if (partyGold >= 5) {

    let heroToHeal = heroes.find(hero => hero.name == heroName)
    heroToHeal.health += 10
    console.log(heroToHeal)
    partyGold -= 5
    drawPartyGold()
  }
  drawParty()
}

function drawParty() {
  heroes.forEach(hero => {
    let heroCard = document.getElementById(hero.name)
    let healthStat = heroCard.querySelector('.health')
    healthStat.innerHTML = `<h6 class="health">Health: ${hero.health}</h6>`
  })
}

drawParty()
drawPartyGold()
drawBoss()


setInterval(attackHeroes, 5000)