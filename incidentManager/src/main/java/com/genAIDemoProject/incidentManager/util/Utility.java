package com.genAIDemoProject.incidentManager.util;

public class Utility {
	
	public static String toPgVectorString(float[] v) {
	    StringBuilder sb = new StringBuilder();
	    sb.append("[");
	    for (int i=0;i<v.length;i++) {
	        sb.append(v[i]);
	        if (i < v.length-1) sb.append(", ");
	    }
	    sb.append("]");
	    return sb.toString();
	}

}
