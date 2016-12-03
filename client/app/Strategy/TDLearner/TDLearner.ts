
import { Agent } from '../Agent/Agent'
import { State } from '../State/State'
import { EvalFnAgent } from '../EvalFn/EvaluationFn'
import { Evaluation } from '../_Param/Evaluation'

export class TDLeaner extends EvalFnAgent {
    strategy = 3;
    weights = [];
    INIT_WEIGHTS = [0, 0, 0, 0, 0, 0, 0];
    feature_matrix = []; //[fea_vec]

    constructor(team: number, depth = 2, weights, myPieces = null, pastMoves = []) {
        super(team, depth, myPieces, pastMoves);
        this.weights = weights;
        // console.log(this.myPieces)
        // this.weights = weights ? weights : this.INIT_WEIGHTS;
    }

    copy() {
        // console.log(this.pastMoves)
        // console.log(this.copyMoves())
        return new TDLeaner(this.team, this.DEPTH, this.weights, this.myPieces.map(x => x.copy()), this.copyMoves());
    }

    merge_arr(x, y) {
        var r = [];
        for (var i = 0; i < x.length; i++) r.push(x[i] + y[i]);
        return r;
    }


    // result: 1-red win | -1:red lose
    // [nThreat, nCapture, nCenterCannon, nBottomCannon, rook_mob, horse_mob, elephant_mob]
    update_weights(nSimulations, result) {
        // console.log(result)
        if (result == 0) return this.weights;
        result *= this.team;
        // consolidate features vectors throught whole game into one
        // console.log("this.feature_matrix:", this.feature_matrix)
        var accu_fea = this.feature_matrix.reduce(this.merge_arr);
        // console.log("accu_fea:", accu_fea)
        // console.log("nSimulations:", nSimulations)
        var eta = 1 / Math.sqrt(nSimulations); // learning rate
        // console.log("eta:", eta)
        var gradient = accu_fea.map(x => x * eta * result);
        // console.log("gradient:", gradient)
        // console.log("this.weights:", this.weights)
        for (var i = 0; i < accu_fea.length; i++) this.weights[i] += gradient[i];
        console.log("UPDATE:", this.weights)
        return this.weights;
    }

    save_state(feature_vec) {
        // console.log("save_state: ", feature_vec, " | Current: ", this.feature_matrix)
        this.feature_matrix.push(feature_vec);
    }



}