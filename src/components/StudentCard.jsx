import thamou from "../assets/thamou.png";

const etudiant = {
  prenom: "Thameur",
  nom: "Wardaltiou",
  email: "thameurwardalitou@gmail.com",
  telephone: "+216 21564620",
  filiere: "Génie Logiciel et Systèmes d'Information",
  anneeEtude: "2ème année",
  groupe: "GLSI 2",
  ville: "Nabeul",
  image: thamou,
};

function StudentCard() {
  return (
    <div className="container">
      <div className="card">
        <img src={etudiant.image} alt="Photo de l'étudiant" />

        <h1>Fiche étudiant</h1>

        <p><strong>Nom & Prénom :</strong> {etudiant.prenom} {etudiant.nom}</p>
        <p><strong>Email :</strong> {etudiant.email}</p>
        <p><strong>Téléphone :</strong> {etudiant.telephone}</p>
        <p><strong>Filière :</strong> {etudiant.filiere}</p>
        <p><strong>Année d'étude :</strong> {etudiant.anneeEtude}</p>
        <p><strong>Groupe :</strong> {etudiant.groupe}</p>
        <p><strong>Ville :</strong> {etudiant.ville}</p>

        <button>Contacter</button>
      </div>
    </div>
  );
}

export default StudentCard;