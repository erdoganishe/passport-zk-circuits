import { expect } from "chai";
import { ethers, zkit } from "hardhat";

import { VoteVerifier } from "@ethers-v6";
import { Vote } from "@zkit";

describe.only("Commitment", () => {
  let voteVerifier: VoteVerifier;
  let voteCircuit: Vote;

  before("setup", async () => {
    console.log("HERE");
    voteCircuit = await zkit.getCircuit("Vote");
    const VoteVerifier = await ethers.getContractFactory("VoteVerifier");

    voteVerifier = await VoteVerifier.deploy() as VoteVerifier;
  });

  it("test", async () => {
    const proof = await voteCircuit.generateProof({
        root : "20044536444086118591887109164436364136320990398424186763077840515405091245125",
        nullifierHash: "19014214495641488759237505126948346942972912379615652741039992445865937985820",
        nullifier: "0",
        vote: "0",
        secret: "0",
        pathElements: ["19014214495641488759237505126948346942972912379615652741039992445865937985820", "10447686833432518214645507207530993719569269870494442919228205482093666444588", "2186774891605521484511138647132707263205739024356090574223746683689524510919", "6624528458765032300068640025753348171674863396263322163275160878496476761795", "17621094343163687115133447910975434564869602694443155644084608475290066932181", "21545791430054675679721663567345713395464273214026699272957697111075114407152", "792508374812064496349952600148548816899123600522533230070209098983274365937", "19099089739310512670052334354801295180468996808740953306205199022348496584760", "1343295825314773980905176364810862207662071643483131058898955641727916222615", "16899046943457659513232595988635409932880678645111808262227296196974010078534", "4978389689432283653287395535267662892150042177938506928108984372770188067714", "9761894086225021818188968785206790816885919715075386907160173350566467311501", "13558719211472510351154804954267502807430687253403060703311957777648054137517", "15093063772197360439942670764347374738539884999170539844715519374005555450641", "8536725160056600348017064378079921187897118401199171112659606555966521727181", "17731960725993409205647629535433695139708451502526773527161126281730851312303", "12378336118662422402312038713508977861617293534645772054906298430730335052258", "15746370922467144378022955960137552273962623515478055069197781668972427980569", "12833304663529859056360652781553170470307618587436982477441419650866727735640", "19675769322130325405595465035336399585577759990829087793049230689392015057069"],
        pathIndices: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
    });

    const data = await voteCircuit.generateCalldata(proof);

    console.log(await voteCircuit.verifyProof(proof));
    console.log(await voteVerifier.verifyProof(...data));
  });
});