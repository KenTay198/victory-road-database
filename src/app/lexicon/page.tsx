import React from "react";

export const metadata = {
  title: "Lexicon | Victory Road Database",
};

function LexiconPage() {
  return (
    <div>
      <h1>Lexicon</h1>
      <h2>General</h2>
      <ul className="pl-5 list-disc">
        <li>
          <span className="font-semibold uppercase">Hissatsu : </span>
          <span>
            Technique usable during a SHOOT, a WALL, a CATCH or a FOCUS battle to
            gain more power.
          </span>
        </li>
      </ul>
      <h2>Gameplay actions</h2>
      <ul className="pl-5 list-disc">
        <li>
          <span className="font-semibold uppercase">Shoot : </span>
          <span>
            When a player from the offensive team kick the ball towards the
            opponent goals.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Wall : </span>
          <span>
            When a field player from the defensive team intercepts a shot before
            it reaches his goalkeeper to reduce its power.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Focus : </span>
          <span>
            When two opposing field players touch, they trigger a battle to pass
            through for the attacking player, or to intercept the ball for the
            defending player. Both of them can use hissatsus to beat the
            opponent.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Scramble : </span>
          <span>
            When a pass is about to land between two opposing field players,
            they trigger a battle to decide who gets the ball. They can choose
            to pass the ball directly to a teammate or to keep it.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">GK : </span>
          <span>
            When a shot reaches the goalkeeper, he have to catch the ball by
            doing a simple catch or using a hissatsu.
          </span>
        </li>
      </ul>
      <h2>Basic statistics</h2>
      <ul className="pl-5 list-disc">
        <li>
          <span className="font-semibold uppercase">Kick : </span>
          <span>Part of the ATT value during a SHOOT.</span>
        </li>
        <li>
          <span className="font-semibold uppercase">Control : </span>
          <span>
            Part of the ATT value during a SHOOT and during a FOCUS battle.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Pressure : </span>
          <span>
            Part of the DEF value during a SCRAMBLE battle and during a WALL.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Physical : </span>
          <span>
            Part of the ATT value during a SCRAMBLE battle, the DEF value during
            a WALL and during a CATCH.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Agility : </span>
          <span>Part of the DEF value during a CATCH.</span>
        </li>
        <li>
          <span className="font-semibold uppercase">Intelligence : </span>
          <span>
            Part of the ATT and DEF value during a SCRAMBLE battle and the DEF
            value during a FOCUS battle.
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase">Technique : </span>
          <span>Part of the ATT and the DEF value during a FOCUS battle</span>
        </li>
      </ul>
    </div>
  );
}

export default LexiconPage;
