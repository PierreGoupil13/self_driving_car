class NeuralNetwork{
    constructor(neuronCounts) {
        this.levels=[];
        for (let i=0; i<neuronCounts.length - 1;i++){
            this.levels.push(new Level(
                neuronCounts[i],
                neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs, network) {
        // On génère des outputs pour le premier niveau
        let outputs=Level.feedForward(givenInputs, network.levels[0]);

        /*
            On loop sur les niveaux suivants
            Pour cela on donne l'output du niveau précédent et on
            update le niveau actuel et ainsi de suite.
         */
        for (let i=1;i<network.levels.length;i++){
            outputs=Level.feedForward(
                outputs,
                network.levels[i]
            );
        }
        return outputs;
    }
}

class Level{
    /*
    Les weights et Biases vont affecter la décision$
    du réseau, mais je ne sais pas encore comment
     */
    constructor(inputCount, outputCount) {
        // Valurs provenants des sensors
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        // Valeur au dessus de laquelle un neurone fire
        this.biases=new Array(outputCount);

        // Poids de chaque liaison entre un neurone i et j
        this.weights=[];
        for (let i = 0; i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        for (let i=0;i<level.inputs.length;i++){
            for (let j=0;j<level.outputs.length;j++){
                // On veut des valeurs entre -1 et 1 d'ou la gymnastique
                level.weights[i][j]=Math.random()*2-1;
            }
        }

        for (let i = 0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }

    /*
        Fonctionnement d'un neurone
     */
    static feedForward(givenInputs, level) {
        //On attribue au i neurone la valeur du i capteur
        for (let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        // Calcul des infos et décision de fire le neurone
        //On loop sur les sorties
        for (let i=0;i<level.outputs.length;i++){
            let sum=0;
            /*
                On loop sur tout les neurones connecté au neurone i
                Pour chaque neuronne on ajoute sa valeur à la somme
                On pondère cette valeur par le poids de la realtion
                entre le neuronne j (entrant) et le neurone i (sortant)
             */
            for (let j=0;j<level.inputs.length;j++) {
                sum+=level.inputs[j]*level.weights[j][i];
            }

            /*
                Si la somme des entrées est supérieur au biais, le
                neurone agit
             */
            if(sum>level.biases[i]) {
                level.outputs[i]=1;
            } else{
                level.outputs[i]=0;
            }
        }
        return level.outputs;
    }
}