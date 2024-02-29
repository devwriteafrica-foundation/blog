import Head from "next/head"
import styles from "../styles/CodeOfConduct.module.css"

export default function CodeOfConduct() {
  return (
    <>
      <Head>
        <title>Devwrites Africa Code of Conduct</title>
        {/* Add any other meta tags or links here */}
      </Head>
      <div className={styles.container}>
        <h1>Code of Conduct</h1>
        <p>Last updated January, 2022</p>
        <p>
          All participants of Devwrites Africa Community are expected to abide
          by our Code of Conduct and Terms of Service, both online and during
          in-person events that are hosted and/or associated with Devwrites
          Africa Community.
        </p>
        <h2>Our Pledge</h2>
        <p>
          As moderators of the Devwrites Africa community, we actively cultivate
          an environment that welcomes everyone and ensures a harassment-free
          experience. This commitment covers all participants, regardless of
          their age, body size, abilities, ethnic background, gender identity,
          level of experience, nationality, appearance, race, religion, or
          sexual orientation.
        </p>

        <h2>Our Standards</h2>
        <p>
          Positive behaviors that contribute to a constructive atmosphere in the
          Devwrites Africa community include using language that is welcoming
          and inclusive, respecting diverse perspectives and experiences,
          correctly using people&lsquo;s pronouns or opting for gender-neutral
          ones when in doubt, accepting constructive feedback graciously,
          prioritizing the community&lsquo;s best interests, empathizing with
          fellow members, properly citing sources in content creation, and
          adhering to AI guidelines, including disclosing any AI help used in
          content development.
        </p>
        <p>
          Unacceptable behaviors in the Devwrites Africa community include using
          sexualized language or imagery, hate speech or discriminatory
          communication, trolling, insults, harassment (both public and
          private), publishing someone&lsquo;s private information without
          consent, plagiarizing, and any actions deemed unprofessional, like
          dismissing or attacking inclusive requests.
        </p>

        <p>
          Our commitment is to prioritize the safety of marginalized individuals
          over the comfort of those in privileged positions. We will not address
          complaints about concepts like &lsquo;reverse&lsquo; forms of
          discrimination (e.g., &lsquo;reverse racism&lsquo; or &lsquo;reverse
          sexism&lsquo;). Also, we respect the setting of personal boundaries,
          the choice not to engage in discussions about social justice issues,
          and critiques of behavior or assumptions that are racist, sexist, or
          oppressive in other ways.
        </p>
        <h2>Enforcement</h2>
        <p>
          Violations can be reported to the team. Reports will be reviewed and
          investigated, leading to necessary actions. Moderators have the right
          to remove comments and suspend members for inappropriate behaviors.
        </p>

        <p>
          Those who share these values and are interested in maintaining
          community standards are encouraged to consider volunteering as
          moderators, with further details available on the Devwrites Africa
          Community Moderation page.
        </p>
        <h2>Attribution</h2>
        <p>
          This Code of Conduct for the Devwrites Africa community is inspired by
          established guidelines, including the{" "}
          <a href="http://contributor-covenant.org/version/1/4">
            Contributor Covenant (version 1.4)
          </a>
          ,
          <a href="http://www.writespeakcode.com/code-of-conduct.html">
            Write/Speak/Code
          </a>{" "}
          , and{" "}
          <a href="https://geekfeminism.org/about/code-of-conduct">
            Geek Feminism
          </a>
          . These sources have provided foundational principles adapted to suit
          the unique context and values of the Devwrites Africa community.
        </p>
      </div>
    </>
  )
}
