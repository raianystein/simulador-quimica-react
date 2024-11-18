import React from "react";
import './styles.css';
import '../../assets/img/logo-iq.png';

export default function InfoDetails() {
  return(
    <div className="container-infoDetails">
      <div className="authors">
        <div>
            <div className="Omar-img"></div>
            <div className="Omar">
                <h3>Juan Omar Machuca Herrera</h3>
                <h4>Professor Associado da Universidade Federal do Rio de Janeiro (IQ-UFRJ)</h4>
            </div>
        </div>
        <div>
            <div className="Raiany-img"></div>
            <div className="Raiany">
                <h3>Raiany da Silva Stein</h3>
                <h4>Bacharelado em Química na Universidade Federal do Rio de Janeiro (IQ-UFRJ)</h4>
            </div>
        </div>
        <div>
            <div className="Roberto-img"></div>
            <div className="Roberto">
                <h3>Roberto Salgado Amado</h3>
                <h4>Professor Associado da Universidade Federal do Rio de Janeiro (IQ-UFRJ)</h4>
            </div>
        </div>
      </div>
      <div className="project-details">
            <p>Através de uma equipe composta por pesquisadores, professores e alunos, esta iniciativa busca desenvolver uma solução tecnológica integralmente pela Universidade Federal do Rio de Janeiro (UFRJ) para auxiliar estudos e simulações em química. Inicialmente focada no estudo dos gases perfeitos, que é um conteúdo fundamental nas disciplinas de físico-química ao longo da trajetória acadêmica universitária.
                A ideia surgiu como uma proposta completamente nacional, desenvolvida internamente na universidade pública, com o intuito de integrar conhecimentos em química e utilizar as ferramentas disponíveis no mercado de tecnologia.
                Esta ferramenta é totalmente gratuita e colaborativa, o que significa que novos conteúdos podem ser adicionados com base nas contribuições da comunidade científica.</p>
      </div>
    </div>
  )
}
