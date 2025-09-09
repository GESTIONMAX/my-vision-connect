import React from 'react';

const LegalNotice: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">Mentions Légales</h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">1. Informations générales</h2>
          <p className="text-slate-600 mb-3">
            Le site Vision Connect est édité par la société Vision Connect SAS, société par actions simplifiée au capital 
            de 50 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
          </p>
          <p className="text-slate-600 mb-3">
            <strong>Siège social :</strong> 123 Rue des Opticiens, 75000 Paris, France<br />
            <strong>Numéro de téléphone :</strong> +33 1 23 45 67 89<br />
            <strong>Email :</strong> contact@vision-connect.fr<br />
            <strong>Numéro de TVA intracommunautaire :</strong> FR12345678900<br />
            <strong>Directeur de la publication :</strong> Jean Dupont
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">2. Hébergement</h2>
          <p className="text-slate-600">
            Le site Vision Connect est hébergé par Coolify, dont le siège social est situé à [Adresse de l'hébergeur].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">3. Propriété intellectuelle</h2>
          <p className="text-slate-600 mb-3">
            L'ensemble du site Vision Connect, y compris sa structure, son design, ses textes, ses images, ses 
            graphismes, ses logos, ses icônes et son code source, est la propriété exclusive de la société 
            Vision Connect SAS ou de ses partenaires.
          </p>
          <p className="text-slate-600 mb-3">
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
            du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
            de la société Vision Connect SAS.
          </p>
          <p className="text-slate-600">
            Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une 
            contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de 
            Propriété Intellectuelle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">4. Données personnelles</h2>
          <p className="text-slate-600 mb-3">
            Les informations recueillies sur les formulaires du site Vision Connect font l'objet d'un traitement 
            informatique destiné à la gestion des commandes et au service client. Ces données sont conservées 
            pendant la durée strictement nécessaire à la réalisation des finalités pour lesquelles elles ont été 
            collectées.
          </p>
          <p className="text-slate-600 mb-3">
            Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement européen 
            n°2016/679/UE du 27 avril 2016 (RGPD), vous bénéficiez d'un droit d'accès, de rectification, de 
            portabilité et d'effacement de vos données ou encore de limitation du traitement.
          </p>
          <p className="text-slate-600">
            Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez nous 
            contacter à l'adresse email : privacy@vision-connect.fr
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">5. Cookies</h2>
          <p className="text-slate-600">
            Le site Vision Connect utilise des cookies pour améliorer l'expérience utilisateur. Pour plus 
            d'informations sur notre utilisation des cookies, veuillez consulter notre 
            <a href="/privacy" className="text-blue-600 hover:underline"> Politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">6. Droit applicable et juridiction compétente</h2>
          <p className="text-slate-600 mb-3">
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français 
            seront seuls compétents.
          </p>
          <p className="text-slate-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalNotice;
