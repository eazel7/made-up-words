/* makewords.js - Â© 2008-2015 chri d. d.
Purpose: Generate random words
Optional? No.  The main purpose of the page that uses this script is to generate
          random words, which is what this script does.  I have not (yet) made
          a CGI version of this script.
*/
var MAX_RECURSION = 100;
var MAX_RETRIES = 100;

const builtin = {
	"latin": "WORD = bsyll mid end | bsyll syll mid end * 2 | bsyll syll syll mid end * 3 | bsyll syll syll syll mid end * 2 | bsyll syll syll syll syll mid end\nbsyll = begin vowel\nsyll = bsyll | mid vowel\nbegin = b*2 | c*2 | cl | d*2 | f | g*2 | h | j | l*2 | m*2 | n*2 | p*2 | pl | qu*2 | r*2 | s*2 | sc | squ | st | t*2 | v\nvowel = a*2 | ae | e*2 | i*4 | o*2 | u*2 \nmid = b*2 | c*2 | ct | d*2 | f | g*2 | l*2 | m*2 | n*2 | nt | p*2 | pt | r*2 | s*2 | t*2 | v\nend = us | um | ous | ation | ion | a | ate\n",
	"greek": "WORD = bsyll mid end | bsyll syll mid end * 2 | bsyll syll syll mid end * 3 | bsyll syll syll syll mid end * 2 | bsyll syll syll syll syll mid end\nbsyll = begin vowel\nsyll = bsyll | mid vowel\nbegin = b | c | ch*2 | chr | chl | d | g | gl | gr | h*2 | l | m | n | p | ph*2 | pn | ps | pt | rh*2 | s | sch | th*2 | x\nvowel = a*2 | ai | au | e*2 | ei | eu | i*2 | o*4 | oi | y*2\nmid = b*2 | c*2 | ch | d*2 | g*2 | l*2 | m*2 | n*2 | p*2 | ph | r*2 | s*2 | th\nend = os | y | e | is | es | a\n",
	"anglo-saxon": "WORD = begin vowel end | begin lvowel lend | begin vowelend*2 | begin lvowel mid vowel end | begin lvowel mid lvowel lend\nbegin = b*2 | bl | br | c*2 | ch | cl | cr | d*2 | dr | f*2 | fl | fr | g*2 | gl | gn | h*2 | j | k | l*2 | m*2 | n*2 | p*2 | ph | pl | pr | qu | r*2 | s*3 | sc | scr | sh | shr | sk | sl | sm | sn | sp | spl | spr | st | sw | t*2 | th | thr | tr | tw | v | w | wh | y\nvowel = a*2 | e*2 | i*2 | o*2 | u*2 | ai | ea | ee | oa | oi | oo | ar | er | ir | or | ur | al | el | il | ol | ul\nlvowel = a | e | i | o | u\nvowelend = o*2 | y*2 | ay*2 | ea | ee | ey | ew | ie*2 | oy*2 | oo*2 | ow*2 | oe*2 | ue*2 | augh | aught | eigh | eight | igh | ight | ough | ought | ar | air | er | ear | eer | ir | or | oar | our | ur | are | ire | ore | ure | all | ale | ell | ill | ile | oll | ole | ull | ule | ail | eal | eel | oal\nmid = b*2 | bb*2 | c*2 | cc*2 | d*2 | dd*2 | f*2 | ff*2 | g*2 | gg*2 | k | m*2 | mm | n*2 | nn | nn | p*2 | pp*2 | r | s*2 | ss*2 | t*2 | tt*2 | v | x | z\nend = b*2 | ch | ct | d*2 | f*2 | g*2 | k | m*2 | n*2 | p*2 | pt | s | st | sk | sp | sh | t*2 | th | x | z\nlend = ck | ff | ss | zz | be | ce | de | fe | ge | ke | me | ne | pe | se | te | ve | ze\n",
	"spanish": "WORD = begina a` mida end*3 | begine e` mida end*3 | begina a mida a` mida end | begine e mida a` mida end | begina a mide e` mida end | begine e mide e` mida end | begina a` mida a mida end | begine e` mida a mida end | begina a` mide e mida end | begine e` mide e mida end | begina a mide e mide e` mida end | begina a mide e` mida a mida end\nbegina = b*2 | c*2 | ch*2 | d*2 | f | g | h | j | l*2 | ll | m*2 | n*2 | p*2 | r*2 | s*2 | t*2 | v | z\nbegine = b*2 | c*2 | ch*2 | d*2 | f | g | h | j | l*2 | ll | m*2 | n*2 | p*2 | qu | r*2 | s*2 | t*2 | v\na = a*3 | o*3 | u\ne = e*3 | i\na` = a*2 | á | o | ó | u*2 | ú | ue*3\ne` = e | é | i*2 | í | ie*3\nmida = b*2 | c*2 | ch*2 | d*2 | f | g*2 | l*2 | ll | m*2 | n*2 | ñ*2 | nt | p*2 | r*2 | rr | s*2 | t*2 | v | x | z\nmide = b*2 | c*2 | ch*2 | d*2 | f | g*2 | l*2 | ll | m*2 | n*2 | ñ*2 | nt | p*2 | r*2 | rr | s*2 | t*2 | v | x\nend = o*5 | a*4 | e\n",
	"french": "WORD = begin vowel cend | begin vowel mid vend | begin vowel mid vowel cend | begin vowel mid vowel cend | begin vowel mid vowel mid vend | begin vowel mid vowel mid vend | begin vowel mid vowel mid vowel cend | begin vowel mid vowel mid vowel cend | begin vowel mid vowel mid vowel mid vend\nbegin = b*2 | c*2 | ch*2 | d | d' | f | g | h | j | l*2 | l' | m*2 | n*2 | p | pl | r | s | t | v\nvowel = a | ai | au | e*2 | Ãª | ee | i | o | oe | oeu | ou | u | ui\nmid = b*2 | c*2 | Ã§ | d*2 | f | g | l*2 | m*2 | n*2 | nd | nt | p | r | s | t | v | zv\nvend = e*6 | a | age | Ã© | Ã©e | et | ette | eau | ue | an | in | on | un | re | le | me\ncend = che | chÃ© | ge | le | lle | me | mme | ne | nne | nc | t | te | tte | gn\n",
	"hawaiian": "WORD = c v c v | c v c v c v | c v c v c v c v | c v c v c v c v c v | c v c v c v c v c v c v | c v c v c v c v c v c v c v | c v c v c v c v c v c v c v c v\nc = ' | p | k | w | h | m | n | l | u\nv = a*2 | ai | au | e*2 | i*2 | o*2 | u*2\n",
	"german": "WORD = begin vowel cend end | begin vowel cend end | begin vowel cmid vowel cend end\nbegin = b | d | pf | fr | g | gr | h | j | k | l | m | n | p | r | s | sch | st | sp | spr | schl | schr | t | tsch | v | w | z\nvowel = a | e | ei | eu | i | ie | o | u | Ã¶ | Ã¼ | ah | eh | ih | oh | uh\ncend = b | d | f | g | k | l | m | n | p | r | s | ÃŸ | t | tz\ncmid = b | d | f | g | k | l | m | n | p | r | s | ÃŸ | t | tz\nend = EMPTY*2 | e | en | chen\n",
	"swahili": "WORD = begin vowel cend end * 4 | begin vowel mid vowel cend end * 4 | begin vowel mid vowel mid vowel cend end * 1\nbegin = begin1 begin2\nbegin1 = EMPTY*158 | s*49 | c*36 | t*29 | m*26 | p*22 | f*16 | tÊƒ*14 | n*13 | v*10 | h*10 | b*6 | d*6 | ts*5 | Êƒ*4 | g*4 | Å‹*3 | sh*2 | sc*1 | j*1\nbegin2 = EMPTY*158 | l*16 | r*18 | Ã­*3 | Ãº*8\nvowel = i*314 | o*103 | oÌ½*28 | oÌŠ*17 | a*72 | aÌ½*72 | e*120 | u*54 | Å¯*29 | ÃºÌŠ*4 | aÌ·*87 | á¹›*11\n# rh*23, Ã³ÌŠ*1\ncend = cend1 cend2 cend3\ncend1 = EMPTY*159 | l*55 | r*35\ncend2 = EMPTY*159 | s*22 | m*13 | f*13 | h*10 | Êƒ*2 | Å‹*8 | sh | gh*7 | j*2 | n*62\ncend3 = EMPTY | c*37 | t*13 | p*3 | v*5 | b*6 | d*9 | ts*2 | g*6\nend = ilun*2 | un*2 | Ä±n | en | aÌ·\nmid = begin*100 | end*20 | end begin*20\n\nREPLACE Êƒr Êƒ\nREPLACE (cs|ts|tÊƒ)[rl] $1\n#AVOID m[tcdg]|n[pcbg]|Å‹[ptbd]\nAVOID [fsÊƒ][bdg]|([jv]|sh)[ptc]\nAVOID h[^aeiou]\nAVOID [^aeiousg]h"
};

function parseLanguage(l) {
	function avoidModifier(prev, re) {
		return function(input) {
			var x = prev(input);
			if (x == null || x.match(re))
				return null;
			return x;
		};
	}

	function replaceModifier(prev, re, str) {
		return function(input) {
			var x = prev(input);
			if (x == null)
				return null;
			else
				return x.replace(re, str);
		};
	}

	function parseProduction(str, output) {
		if (output.totalWeight == null)
			output.totalWeight = 0;
		var options = str.split(/\|/);
		for (var i = 0; i < options.length; i++) {
			var result = options[i].
			replace(/^\s*/, "").
			replace(/\s*$/, "").
			match(/^([^*]*)(\*\s*(\d+|\d*\.\d+))?$/);
			if (result == null)
				throw "Syntax error in option " + options[i];
			var multiplier = 1;
			if (result[3])
				multiplier = +(result[3]);

			var words = result[1].split(/\s+/);
			words.weightStart = output.totalWeight;
			output.totalWeight += multiplier;
			output.push(words);
		}
	}
	var lines = l.split(/[\r\n]+/);
	var modifier = function(x) { return x; };
	var productions = {
		p_SPACE: [
			[" "]
		],
		p_EMPTY: [
			[]
		]
	};
	productions.p_SPACE[0].weightStart = 0;
	productions.p_SPACE.totalWeight = 1;
	productions.p_EMPTY[0].weightStart = 0;
	productions.p_EMPTY.totalWeight = 1;
	for (var i = 0; i < lines.length; i++) {
		//lines = lines.replace(/#.*$/,"");
		// blank lines and comments
		
		if (lines[i].match(/^\s*$/) || lines[i].match(/^\s*#/))
			continue;

		var result = lines[i].match(/^\s*AVOID\s+(.*)$/);
		if (result) {
			modifier = avoidModifier(modifier, new RegExp(result[1]));
			continue;
		}

		result = lines[i].match(/^\s*REPLACE(1?)\s+(\S+)\s+(.*)$/);
		if (result) {
			modifier = replaceModifier(modifier,
				new RegExp(result[2], result[1] == "1" ? "" : "g"),
				result[3]);
			continue;
		}

		result = lines[i].match(/^\s*([^\s=]*)\s*=\s*(.*)/);
		
		if (result) {
			if (productions["p_" + result[1]] == null)
				productions["p_" + result[1]] = [];
			parseProduction(result[2], productions["p_" + result[1]]);
			continue;
		}

		throw "Syntax error at line " + (i + 1) + "\n" + lines[i];
	}
	return { productions: productions, modifier: modifier };
}

function pick(ar) {
	var r = Math.random() * ar.totalWeight;
	for (var i = 0; i < ar.length - 1; i++)
		if (r < ar[i + 1].weightStart)
			return ar[i];
	return ar[ar.length - 1];
}

function generate(origin) {
	function generate_r(name, maxRecursion) {
		var production = origin.productions["p_" + name];
		if (production == null || maxRecursion <= 0)
			return name;
		var nexts = pick(production);
		var result = "";
		for (var i = 0; i < nexts.length; i++)
			result += generate_r(nexts[i], maxRecursion - 1);
		return result;
	}
	for (var tries = 0; tries < MAX_RETRIES; tries++) {
		var word = generate_r("WORD", MAX_RECURSION);
		word = origin.modifier(word);
		if (word != null)
			return word;
	}
	return "(failed to come up with acceptable word)";
}

function doWords(numwords, origin) {
	var out = [];
	for (var i = 0; i < numwords; i++) {
		out.push(generate(parseLanguage(builtin[origin])).toLowerCase());
	}

	return out;
}

module.exports = doWords;
