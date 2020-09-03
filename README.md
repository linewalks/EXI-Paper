## Boosting Development Process of Deep Learning Model with Visual Analytics for Electronic Health Records

Cinyoung Hur 1, JeongA Wi 2, YoungBin Kim 2,*

1. Linewalks, 8F, 5, Teheran-ro 14-gil, Gangnam-gu, Seoul, 06235 Republic of Korea
2. Graduate School of Advanced Imaging Science, Multimedia & Film, Chung-Ang University 84, Heukseok-ro, Dongjak-gu, Seoul, 06974 Republic of Korea
*ybkim85@cau.ac.kr

### ABSTRACT
Electronic health record (EHR) data is widely used to predict early diagnosis and make a treatment plan, which are key areas of research. We aimed to increase the efficiency of iteratively applying data-intensive technology and verifying the results for complex and big EHR data. We used a system of sequence mining, interpretable deep learning models, and visualization on data extracted from the MIMIC-III database for a group of patients diagnosed with heart disease. The results of sequence mining corresponded to specific pathways of interest to medical staff and were used to select patient groups that went through these pathways. An interactive Sankey diagram representing these pathways and a heatmap visually representing the weight of each variable were developed for temporal and quantitative illustration. We applied the proposed system to predict unplanned cardiac surgery, using clinical pathways determined by sequence pattern mining to select cardiac surgery from complex EHRs to label subject groups and deep learning models. The proposed system aids in the selection of pathway-based patient groups, simplification of labelling, and exploratory interpretation of modelling results. The proposed system can help medical staff explore various pathways that patients have gone through and further facilitate the testing of various clinical hypotheses using big data in the medical domain.

--- 

## Prerequisites
1. Install latest version of Node.js

    `https://github.com/creationix/nvm`

    * install using NVM

        `nvm install node`

2. Install Node Package Manager

    `npm install -g yarn`

## Installation guide

1. `git clone https://github.com/linewalks/EXI-Paper`

2. `cd EXI-Paper`

3. `yarn install`

4. `yarn dev`

5. `http://localhost:3000`


---

## Special Thanks to 
- [Yohan Lee](https://github.com/orgs/linewalks/people/jik0090)
- [Yuna Lee](https://github.com/orgs/linewalks/people/yuna12)
- Youngji Kwon
