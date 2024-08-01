export default function CharacterDetails() {
   return (
      <section id="section-wrapper" className="main-content">
         <div id="titles" className="main-titles">
            <h1>This "room" in the Tavern does not exist yet!</h1>
            <h4>
               It is a planned expansion of the Silver Feather Tavern.
            </h4>
         </div>
         <div id="coming-soon">
            <img src="/images/coming-soon.png" style={{ height: "350px", width: "350px" }} ></img>
         </div>
         <h6 style={{ textAlign: "center", margin: "25px", color: theme.palette.secondary.dark }} >
            Please excuse us, but the Tavern is big and our plans are even bigger.
            This feature will be added in version 2, as soon as our masons are
            available.
         </h6>
         <h5 style={{ textAlign: "center", margin: "10px", color: theme.palette.secondary.main, }} >
            Return to <Link to="/" className="card-links"> The Entrance hall (home page)</Link> or use the signs at the top.
         </h5>
      </section>
   );
}