import { useState } from "react";

function StudentForm({
  onAjouterEtudiant,
  etudiantAModifier,
  onModifierEtudiant,
  onAnnuler,
}) {
  const [nom, setNom] = useState(etudiantAModifier?.nom || "");
  const [prenom, setPrenom] = useState(etudiantAModifier?.prenom || "");
  const [email, setEmail] = useState(etudiantAModifier?.email || "");
  const [telephone, setTelephone] = useState(etudiantAModifier?.telephone || "");
  const [filiere, setFiliere] = useState(etudiantAModifier?.filiere || "");
  const [anneeEtude, setAnneeEtude] = useState(etudiantAModifier?.anneeEtude || "");
  const [groupe, setGroupe] = useState(etudiantAModifier?.groupe || "");
  const [ville, setVille] = useState(etudiantAModifier?.ville || "");
  const [image, setImage] = useState(etudiantAModifier?.image || "");

  const [erreurs, setErreurs] = useState({});
  const [fileKey, setFileKey] = useState(0);

  function validerFormulaire() {
    const nouvellesErreurs = {};

    if (!nom.trim()) nouvellesErreurs.nom = "Le nom est obligatoire";
    if (!prenom.trim()) nouvellesErreurs.prenom = "Le prénom est obligatoire";

    if (!email.trim()) {
      nouvellesErreurs.email = "L'email est obligatoire";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      nouvellesErreurs.email = "L'email n'est pas valide";
    }

    if (!telephone.trim()) {
      nouvellesErreurs.telephone = "Le téléphone est obligatoire";
    }

    if (!filiere) nouvellesErreurs.filiere = "Choisir une filière";

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  }

  function reinitialiser() {
    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
    setFiliere("");
    setAnneeEtude("");
    setGroupe("");
    setVille("");
    setImage("");
    setFileKey((k) => k + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validerFormulaire()) {
      return;
    }

    const nouvelEtudiant = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      filiere,
      anneeEtude,
      groupe: groupe.trim(),
      ville: ville.trim(),
      image,
    };

    if (etudiantAModifier) {
      onModifierEtudiant({ ...etudiantAModifier, ...nouvelEtudiant });
    } else {
      onAjouterEtudiant(nouvelEtudiant);
      reinitialiser();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form" noValidate>
      <h2>{etudiantAModifier ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>

      <div className="form-group">
        <label htmlFor="nom">Nom :</label>
        <input type="text" id="nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        {erreurs.nom && <p className="error-msg">{erreurs.nom}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="prenom">Prénom :</label>
        <input type="text" id="prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        {erreurs.prenom && <p className="error-msg">{erreurs.prenom}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {erreurs.email && <p className="error-msg">{erreurs.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Téléphone :</label>
        <input type="tel" id="telephone" name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        {erreurs.telephone && <p className="error-msg">{erreurs.telephone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="filiere">Filière :</label>
        <select id="filiere" name="filiere" value={filiere} onChange={(e) => setFiliere(e.target.value)}>
          <option value="">Choisir une filière</option>
          <option value="Génie Logiciel et Systèmes d'Information">
            GLSI - Génie Logiciel et Systèmes d'Information
          </option>
          <option value="Développement des Systèmes d'Information">
            DSI - Développement des Systèmes d'Information
          </option>
          <option value="Réseaux et Systèmes d'Information">
            RSI - Réseaux et Systèmes d'Information
          </option>
        </select>
        {erreurs.filiere && <p className="error-msg">{erreurs.filiere}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="anneeEtude">Année d'étude :</label>
        <select id="anneeEtude" name="anneeEtude" value={anneeEtude} onChange={(e) => setAnneeEtude(e.target.value)}>
          <option value="">Choisir une année</option>
          <option value="1ère année">1ère année</option>
          <option value="2ème année">2ème année</option>
          <option value="3ème année">3ème année</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="groupe">Groupe :</label>
        <input type="text" id="groupe" name="groupe" value={groupe} onChange={(e) => setGroupe(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="ville">Ville :</label>
        <input type="text" id="ville" name="ville" value={ville} onChange={(e) => setVille(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image :</label>
        <input
          key={fileKey}
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            const fichier = e.target.files[0];
            if (fichier) {
              setImage(URL.createObjectURL(fichier));
            }
          }}
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {etudiantAModifier ? "Modifier" : "Ajouter"}
        </button>
        {etudiantAModifier && (
          <button type="button" className="btn-cancel" onClick={onAnnuler}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;