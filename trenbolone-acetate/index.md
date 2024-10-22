# Trenbolone Acetate


Description : The secret sauce for an absolute jacked body. Don't do steroids it's a joke.

<!--more-->

```python
from Crypto.Util.number import long_to_bytes, inverse
import math

e = 65537
p = 151540898923253505685929590839467610476539231339984453937399928757529520395167994115755166265617251672043185236161363121625933790823240632902021976254031919968575780199199933705267309277878642940651911668712031181453138874513134847392060819408927032892075325270040952708055668741089143717243401303024555257629
encrypted_flag = 62130611808071924157398153337110169881115623035761353303394700596364080742331124879742908534539443787955006486774543104468310804975985367063089195251303827530413088682105551248653655638942312952094068477891397004926175792467916567277944737527645094941228947021238157725696040984712238137828461440477979793456575204837684757915332307919452228420193646700251581909132248549067876579182336774703780268647372960035432270928983842602429692956696506666044882348030819113255583007795269333315118631439882037747450787912860822011761117894078436170878717371829071319763913543527109475068941247120391623243556159705915835781362858849378445913833164609278311195852482958673555185091188318847648271364500104500702659343436915124335242532849280560600918631058494274613690845965393657486422698213910694438669478396166173517391943411178749639509990601244234074419867341327774780833807604738183148389078858434161246760737096556976284039403609683297343606989936610691097226520854962178984235819532056759477186583907959845120623155523172846676902917144693320762999287033911236093502298124850739560415371140286932854755348796285418686174155799925139866426454688331347842315485889845839038355062605314851878008846106790062131002766303399353071508409527132262499313475320452792782151182683854389922501673662693649309467769313897072655026179911082724826700499671059169888881961928591456875094434611865469815102121775014030444187343797598662097239885026066506984451976725295507403158410798624628485348903638098081473779699995606507862216095403042155779938324371960762207448542127023574145464742106050070611137681258379981541894378192033959985106825879418139294336901370950398480842756139725691152374301727037254213678709029932170629076519461281569755910607198521794982137816490112108072377864548151488591943331731935355840820365260676019313232955493693180135153314851725650149501427282008957346511779062505821376706437845130698808328687124239947613339225383042565656979500191632435121020418785595254245182925216124637477542064355646071099125030722163551954894354670997159992557865219480356324107821458500983110651967184166131874412591748616429320476185866886151446199425134792570144173757492540713715368372769979818302434311767911300677399222795810069068114391826483733159218299565146751812031007167002963287877846543869735363457083775367773251331380123651912867321534485471586067003303868334277092484921535110094244569082749638883050358620389337835554027588027312362061217434936349766455265939646896508508950067442032543609440996239652940987362882890533518294698786131356850519992693918493328864443758526902433359749541044947063108958521939584534808818867531374000818732435743883529392110591562966165336894733758466575112307373489686087653691426988063684242004720619000661765128950731853703035906505832285685885832294949757048909604332024699360719677739726768377626624532250240685134529141489460888939613226461018337319728189167040899777440436105324090717540341380850865721812587170693782718816934268907507431797814678379348572101999033936154331628990245809173925684779398958418063614567260904290488298965590863004119311007771786166799448036810144295334663506007328226429941971798535408317245590663667664944120903755966475346104008323925523164610193735046802758837774261066581148557319274132828861979467775604075575175447399539400842360694084517736608141075591544174334225453009332305584176445150405521690312582211098818825174287936926294911688524332748533950065813798654076348054450965957292839639265659777389741087604769892282719385782010083234005510836265143594508472404579794356395946669185129173514616781925052967338120146803686841364428866164724934862855259022075685886858090124640570668779801654387723706308739173
n = p
phi_n = (p - 1)
d = inverse(e, phi_n)
decrypted_flag = pow(encrypted_flag, d, n)
flag = long_to_bytes(decrypted_flag)
print(flag)


```

## Explanation

I'm not a crypto player, this was pure luck.

Sometimes you just have to trust nature, one could hit a Rubik's cube with a wrench and it'll solve itself. Read the sentence again, it is technically true isn't it ?

If I had to guess, I think the fact that n is not the usual p*q, and the equation could reduce from : 

 \[
   \text{C} = M^e + p_0 \cdot q_0 \cdot p_1 \cdot q_1
   \]

to : 

\[
   \text{C} \mod p_1 = M^e \mod p_1
   \]

so we could use p1 to decrypt our flag.
