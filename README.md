# Avero Check API UI Exercise

### Dev Log

**Monday 7:45pm** Started project. Read through the spec and API. No magic here. Using postman to check all the endpoints. Neat, they all work.

**Monday 8:30pm** Sketching out a UI mockup. The UX obviously will depend on what kind of device (phone-size, tablet-size, or computer-bolted-to-the-table). I'm going to roll with a smartphone that has good network signal.

For the record, I've never waited tables, and if this was a real thing the very first thing I would do would be to go do some ethnography: observe users in the wild, then talk with them about life in the biz. But in a quick little hack like this, I'll just design for a make believe user based on my assumptions.

So, the UX has to be designed for:

- A server (stressed out, slightly drunk)
- One-handed use (stressed-out server is bringing table 7 a beer but gets waylaid by table 2)
- A small menu (no Cheesecake factory Tome Of Infinite Choices... we only have 12 items)

![Table layout](img/IMG_0975.jpg)

The main UI shows the floor plan. Each table has a number, and tapping a table will take you to a new layer for working with that table's check. The floor plan can also color code tables (e.g. available, what are your tables, who just sat down and needs drinks, where are the checks closed and guests are hanging out, etc.)

![Item Entry](img/IMG_0976.jpg)

The item entry UI should be geared for efficiency. This is where most data entry happens, and it should be crystal clear what the situation is.

![Beverage Entry](img/IMG_0977.jpg)

Drilling down into an item category gives some specific options, and if there's not room for all of them, there's a 'more' option that can drill down further. There's a fat green `<` button at the top left that can be used to dismiss the page. A swipe left/right would be better, but that's for v2.

**Monday 9:20pm** The business requirements have some points that aren't in the typical rhythm. E.g. the server generally operates with open checks, adding items, and then closing it out. Off-rhythm tasks include opening up a check for table X from earlier in the day (or week?)

In this spec a check is either open or closed, but it seems there is a middle ground where a party has asked for their bill, and they need to add tip. But since I get to fill in missing info, I elect to make the Greasy Spoon one of those no-tip zones where waitstaff do not receive tips at all but instead make a dignified salary with benefits.

**Monday 9:30pm** Going to finish the night by getting a baseline 'hello world' React app working and push it to GitHub.

**Monday 10pm** Done for the night. Read up on `fetch` and how adding headers works there. Proof of concept in the little app.